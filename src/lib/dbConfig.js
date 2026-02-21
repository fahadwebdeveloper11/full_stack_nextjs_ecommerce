import mongoose from "mongoose";

const connection = {
  isConnected: "",
};

export const connectDB = async () => {
  if (connection.isConnected) {
    console.log("Database is already connected");
    return;
  } else {
    console.log("process.env.MONGO_URI ", process.env.MONGO_URI);

    try {
      let dbUri = process.env.MONGO_URI;

      // Handle potential trailing slash in base URI
      if (dbUri.includes("?")) {
        const [base, query] = dbUri.split("?");
        const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
        dbUri = `${cleanBase}/ecommerce?${query}`;
      } else {
        const cleanBase = dbUri.endsWith("/") ? dbUri.slice(0, -1) : dbUri;
        dbUri = `${cleanBase}/ecommerce`;
      }

      const response = await mongoose.connect(dbUri);

      console.log(`MongoDB connected: ${response.connection.host}`);
      connection.isConnected = response.connections[0].readyState;
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
};
