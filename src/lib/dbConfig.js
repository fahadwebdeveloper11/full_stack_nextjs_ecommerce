import mongoose from "mongoose";

const connection = {
  isConnected: "",
};

export const connectDB = async () => {
  if (connection.isConnected) {
    console.log("Database is already connected");
    return;
  } else {
    try {
      const response = await mongoose.connect(
        `${process.env.MONGO_URI}/ecommerce`
      );

      console.log(`MongoDB connected: ${response.connection.host}`);
      connection.isConnected = response.connection[0]?.readyState;
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
};
