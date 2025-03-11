async function fetchQuote() {
    try {
        console.log("Fetching quote...");
        const response = await fetch("https://api.adviceslip.com/advice");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received quote:", data.slip.advice);
        document.getElementById("quote").textContent = data.slip.advice;
    } catch (error) {
        console.error("Error fetching quote:", error);
        document.getElementById("quote").textContent = "Failed to load quote.";
    }
}
