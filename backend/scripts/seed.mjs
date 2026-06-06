/**
 * Seed MongoDB with default portfolio data.
 * Usage: npm run seed (from backend folder)
 */
import dotenv from "dotenv";
import mongoose from "mongoose";
import Portfolio from "../models/Portfolio.js";
import defaultPortfolio from "../data/defaultPortfolio.json" with { type: "json" };

dotenv.config();

const seed = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI missing in backend/.env");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);

  await Portfolio.deleteMany({});
  const doc = await Portfolio.create({
    ...defaultPortfolio,
    updatedAt: new Date(),
  });

  console.log("Portfolio seeded:", doc._id.toString());
  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
