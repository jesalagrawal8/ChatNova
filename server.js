import "dotenv/config";
import express from "express";
import cors from "cors";
import { generate } from "./chatbot.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.post("/chat", async (req, res) => {
  const { message, threadId } = req.body;
  // todo: validate above fields

  if (!message || !threadId) {
    res.status(400).json({ message: "All fields are required!" });
    return;
  }

  console.log("Message", message);

  try {
    const result = await generate(message, threadId);
    res.json({ message: result });
  } catch (error) {
    console.error("Error generating response:", error);
    res
      .status(500)
      .json({
        message:
          "An error occurred while generating the response. Please try again.",
      });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
