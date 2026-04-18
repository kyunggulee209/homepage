import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// API health check endpoint
app.get("/api/status", (req, res) => {
  res.json({ status: "ok", message: "CMS API is running on Vercel" });
});

// Any other /api routes can be added here
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Vercel Serverless Function!" });
});

// Important: We export the express app rather than calling app.listen()
// Vercel Serverless Functions will use this exported instance.
export default app;
