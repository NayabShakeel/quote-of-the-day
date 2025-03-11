document.addEventListener("DOMContentLoaded", () => {
    const quoteText = document.getElementById("quote");
    const newQuoteBtn = document.getElementById("new-quote");
    const copyQuoteBtn = document.getElementById("copy-quote");

    // Function to fetch a new quote
    async function fetchQuote() {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 3000); // 3s timeout
            
            let response = await fetch("https://api.adviceslip.com/advice", { signal: controller.signal });
            if (!response.ok) throw new Error("Primary API failed");
            
            let data = await response.json();
            quoteText.textContent = `"${data.slip.advice}"`;
            clearTimeout(timeout);
        } catch (error) {
            console.warn("Primary API failed, using fallback...");
            fetchFallbackQuote();
        }
    }

    // Fallback quote if the main API fails
    function fetchFallbackQuote() {
        const quotes = [
            "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            "Believe you can and you're halfway there.",
            "The only way to do great work is to love what you do.",
            "Difficulties in life are intended to make us better, not bitter."
        ];
        quoteText.textContent = `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;
    }

    // Copy quote to clipboard
    function copyToClipboard() {
        navigator.clipboard.writeText(quoteText.textContent)
            .then(() => {
                copyQuoteBtn.textContent = "Copied!";
                setTimeout(() => copyQuoteBtn.textContent = "Copy", 1500);
            })
            .catch(err => console.error("Clipboard copy failed", err));
    }

    // Add event listeners
    newQuoteBtn.addEventListener("click", fetchQuote);
    copyQuoteBtn.addEventListener("click", copyToClipboard);
    
    // Initial quote load
    fetchQuote();
});
