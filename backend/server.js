const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

const quotes = [
    "The best way to predict the future is to create it.",
    "Dream big and dare to fail.",
    "Life is what happens when you're busy making other plans.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts."
];

app.get("/quote", (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    res.json({ quote: quotes[randomIndex] });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
