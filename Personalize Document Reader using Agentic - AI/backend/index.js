// backend/index.js

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const axios = require("axios");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Use multer to store uploaded files in /uploads
const upload = multer({ dest: "uploads/" });

// POST /upload
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      console.log("No file received.");
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = path.join(__dirname, req.file.path);
    console.log("Received file at path:", filePath); // 👈 Add this

    // Send file path to RAG service
    const result = await axios.post("http://localhost:8000/upload", {
      file_path: filePath,
    });

    console.log("Python RAG response:", result.data); // 👈 Add this
    res.json({ message: "File processed", result: result.data });
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ error: "Something went wrong on server" });
  }
});


// POST /ask
app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;
    const response = await axios.post("http://localhost:8000/ask", { question });

    console.log("✅ Python responded with:", response.data); // add this
    res.json(response.data);
  } catch (err) {
    console.error("Ask error:", err.message);
    res.status(500).json({ error: "Failed to ask question" });
  }
});


// Start backend server
app.listen(5000, () => {
  console.log("✅ Backend running at http://localhost:5000");
});
