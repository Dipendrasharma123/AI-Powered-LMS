const express = require("express");
const axios = require("axios");
const cors = require("cors");
const router = express.Router();
const bodyParser = require("body-parser");

const OPENROUTER_API_KEY = "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"; // Replace with OpenRouter API key

router.post("/", async (req, res) => {
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

module.exports = router;
