import express from "express";
import cors from "cors";
import { connectToDB } from "./config/connectToDB.js";
import searchRouter from "./routes/searchRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import wikiRouter from "./routes/wikiRoutes.js";
import stripeRouter from "./routes/stripeRoutes.js";
import accountRouter from "./routes/accountRoutes.js";
import { stripeWebhook } from "./controllers/stripeController.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook,
);
app.use(express.json());

app.use("/api/auth", accountRouter);
app.use("/api/billing", stripeRouter);

app.use("/api/search", searchRouter);
app.use("/api/ai", aiRouter);
app.use("/api/wiki", wikiRouter);

app.listen(3001, async () => {
  console.log("Server is running...");
  await connectToDB();
});
