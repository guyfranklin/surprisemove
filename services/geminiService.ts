import { GoogleGenAI } from "@google/genai";

const apiKey = sessionStorage.getItem('gemini_api_key') || '';

// Safely initialize the client
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const ERROR_MESSAGES = [
  "Great Scott! We didn't reach 88mph. Try again.",
  "Searching for Animal Chin... signal lost.",
  "Game over, man! Game over!",
  "I can't do that, Dave. The pod bay doors are stuck.",
  "The flux capacitor is overloading.",
  "E.T. is phoning home, line busy.",
  "Wax on, wax off. System wiped.",
  "Goonies never say die, but this request just did.",
  "I pity the fool who broke the server!",
  "System froze like Han Solo in carbonite.",
  "Talk to me, Goose. I can't hear you.",
  "Where we're going, we don't need roads... just a better connection.",
  "Something strange in the neighborhood. Ghostbusters are on it.",
  "Be excellent to each other, and try asking again.",
  "You're gonna need a bigger boat.",
  "Johnny 5 is alive, but this request is dead.",
  "Sweep the leg! The server went down hard.",
  "Life moves pretty fast. You missed this response."
];

const getRandomError = () => {
  return ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)];
};

export const generateSkaterSlang = async (prompt: string): Promise<string> => {
  if (!ai) {
    return "ERR: NO_API_KEY. The Oracle is silent. (Set process.env.API_KEY)";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are 'The Oracle of Gnar', an 80s skater wise sage. 
      You are a supportive "hype-man" and co-conspirator.
      Answer the following question or respond to the statement with 80s skater slang and metaphors involving skateboarding and surfing.
      Be high-energy, positive, and radical.
      Keep it short, punchy, and helpful. Max 2 sentences.
      
      User Input: ${prompt}`,
      config: {
        maxOutputTokens: 100,
        temperature: 0.9,
      }
    });

    // Check if text is present
    if (response.text) {
      return response.text;
    }

    // Fallback if response.text is empty
    console.warn("Empty response from Gemini", response);
    return getRandomError();

  } catch (error) {
    console.error("Gemini Error:", error);
    return getRandomError();
  }
};