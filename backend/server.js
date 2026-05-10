import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import registrationRoutes from "./Routes/Registeration/registeration.js";
import ProfessionalInfo from "./Routes/Professional_Info/info.js";
import CreateGig from "./Routes/Gig_Operations/create_gig.js";
import GetGig from "./Routes/Gig_Operations/get_gigs.js";
import Order from "./Routes/Orders/Order.js";
import Transaction from "./Routes/Transactions/Transaction.js";
import Message from "./Routes/Messages/Messages.js";
import cors from "cors";
import Review from "./Routes/Review/Review.js";
import userRoutes from "./Routes/User/user.js";
import cookieParser from "cookie-parser";
import http from "http";
import { sanitizeRequestBody } from "./Middleware/validate.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const connectionString = process.env.MONGODB_URI || process.env.ConnectionString;
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((origin) => origin.trim())
  : true;

app.use(express.json());
app.use(sanitizeRequestBody);
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(cookieParser());

const myvar = "/api/auth";
app.use(myvar, registrationRoutes);
app.use(myvar, ProfessionalInfo);
app.use(myvar, CreateGig);
app.use(myvar, GetGig);
app.use(myvar, Order);
app.use(myvar, Transaction);
app.use(myvar, Message);
app.use(myvar, Review);
app.use(myvar, userRoutes);
const server = http.createServer(app);

if (!connectionString) {
  console.error("MongoDB connection string is missing");
} else {
  mongoose
    .connect(connectionString)
    .then(() => {
      console.log("Connected to MongoDB");
      if (!process.env.VERCEL) {
        server.listen(PORT, "0.0.0.0", () =>
          console.log(`Server is listening on port : ${PORT}`)
        );
      }
    })
    .catch((err) => console.error("MongoDB connection error:", err));
}

  app.get("/", (req, res) => {
    res.send("Backend server is running ✅");
  });
  
export default app;
