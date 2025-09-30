const API_KEY = "AIzaSyCjJh9O908yFWMBnTst196RsmGmbfA8oZw";  // your Gemini key
const proxy = "https://cors-anywhere.herokuapp.com/";
const url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY;

async function askGemini() {
  const input = document.getElementById("foodInput").value;
  const responseBox = document.getElementById("responseBox");

  if (!input) {
    responseBox.innerText = "❌ Please enter some food.";
    return;
  }

  responseBox.innerText = "⏳ Asking Gemini...";

  try {
    const response = await fetch(proxy + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `Estimate calories and nutrition for: ${input}` }]
          }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }

    const data = await response.json();
    const geminiText =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response from Gemini.";

    responseBox.innerText = geminiText;
  } catch (error) {
    console.error(error);
    responseBox.innerText = "❌ Error: " + error.message;
  }
}
