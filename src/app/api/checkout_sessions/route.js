import { getToken } from "next-auth/jwt";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET);

export async function POST(request) {
  const token = getToken({ req: request });
  try {
    console.log("Stripe Secret Key", process.env.NEXT_PUBLIC_STRIPE_SECRET);
    const { products } = await request.json();
    console.log("Products", products);

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "pkr",
        product_data: {
         
          name: product.title,
          description: product.description,
          images: [product.image.url],
        },
        unit_amount: product.price * 100, // Amount in cents
      },
      quantity: product.itemQty,
    }));

    console.log("LineItems", lineItems);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${
        request.headers.origin || "http://localhost:3000"
      }/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.origin || "http://localhost:3000"}/cancel`,
      client_reference_id: token?._id,
    });

    return Response.json(
      { sessionId: session.id, success: true, message: "success" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
