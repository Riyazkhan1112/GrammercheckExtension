document.getElementById("checkGrammar").addEventListener("click", async () => {
    const inputText = document.getElementById("inputText").value.trim();
    const correctedTextElement = document.getElementById("correctedText");

    if (!inputText) {
        correctedTextElement.innerText = "Please enter a sentence.";
        return;
    }

    const apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your actual OpenAI API key
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // Use GPT-4 if you prefer
                messages: [
                    { role: "system", content: "You are a helpful grammar correction assistant." },
                    { role: "user", content: `Correct the grammar of this sentence: "${inputText}"` }
                ],
                max_tokens: 100
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        const correctedSentence = result.choices[0]?.message?.content.trim() || "Could not generate a correction.";

        correctedTextElement.innerText = "Corrected: " + correctedSentence;

    } catch (error) {
        correctedTextElement.innerText = "Error checking grammar. Please try again.";
        console.error("Error:", error);
    }
});
 