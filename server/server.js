const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const OPENROUTER_API_KEY = "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"; // Replace with your OpenRouter API key

app.post("/chatbot", async (req, res) => {
    try {
        const { message } = req.body;

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are an LMS chatbot." },
                    { role: "user", content: message }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error("Chatbot Error:", error);
        res.status(500).json({ error: "Error fetching chatbot response" });
    }
});

const path = require("path");

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// Route to serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Body parser
app.use("/auth", authRoutes); // Authentication routes

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
