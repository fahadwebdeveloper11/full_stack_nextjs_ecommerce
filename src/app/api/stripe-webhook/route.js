import { buffer } from "micro";
import Stripe from "stripe";
import { connectDB } from "@/lib/dbConfig";
import Order from "@/models/OrderModel";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

// Connect to your MongoDB database

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(req) {
  await connectDB();
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;

        // Insert the order into MongoDB
        try {
          // Prepare the order data
          const order = await Order.create({
            userId: session.client_reference_id,
            amount: session.amount_total,
            products: session.display_items.map((item) => ({
              product: item._id,
              quantity: item.quantity,
            })),
          });

          console.log("Order created in MongoDB:", order);
        } catch (error) {
          console.error("Error saving order to MongoDB:", error);
          return res.status(500).json({ error: "Failed to save order" });
        }

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    Response.json(
      { received: true, success: true, message: "success" },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error verifying Stripe signature:", err.message);
    return Response.json(
      { success: false, message: `Webhook Error: ${err.message}` },
      { status: 500 }
    );
  }
}
