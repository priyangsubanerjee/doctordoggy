import mongoose from "mongoose";

const url = process.env.MONGODB_URI;

const connectDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
};

export default connectDatabase;
