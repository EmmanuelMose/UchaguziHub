import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const fetchModels = async () => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error("Missing GEMINI_API_KEY in .env");
      return;
    }

    const response = await axios.get(
      "https://generativelanguage.googleapis.com/v1beta/models",
      {
        params: {
          key: process.env.GEMINI_API_KEY,
        },
      }
    );

    console.log("Available Models:", JSON.stringify(response.data, null, 2));
  } catch (error: any) {
    console.error("Error fetching models:", error.response?.data || error.message);
  }
};

fetchModels();