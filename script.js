// ⚠️ WARNING: Exposing your API key publicly is insecure.
// For GitHub Pages demo purposes only.
const GEMINI_API_KEY = "AIzaSyCjJh9O908yFWMBnTst196RsmGmbfA8oZw";  

async function sendPrompt() {
  const prompt = document.getElementById("prompt").value;

  document.getElementById("output").innerText = "Loading...";

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    console.log(data);

    if (data.candidates && data.candidates.length > 0) {
      document.getElementById("output").innerText =
        data.candidates[0].content.parts[0].text;
    } else {
      document.getElementById("output").innerText =
        "No response from Gemini.";
    }
  } catch (err) {
    document.getElementById("output").innerText = "Error: " + err;
  }
}
