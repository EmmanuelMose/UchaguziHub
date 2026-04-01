import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_CONTEXT = `
You are the UchaguziHub Support AI. Your job is to help users navigate the Election Management System.
System Rules:
- Users register/login to vote.
- Admins create Elections, Positions, and manage System Users.
- Candidates belong to a specific Election and Position.
- Each user can only vote once per position in an election.
- Use the sidebar to access 'Elections' to vote or 'Election Results' to view winners.
- If a user is stuck, tell them to submit a message via the 'Complains' section.
Keep answers short and professional.
`;

export const handleChat = async (req: any, res: any) => {
  const { message, history } = req.body;

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "models/gemini-3.1-flash-lite-preview"
    });

    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.role,
      parts: msg.parts
    }));

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: SYSTEM_CONTEXT }] },
        ...formattedHistory
      ]
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;

    res.json({ reply: response.text() });

  } catch (error: any) {
    res.status(500).json({
      error: "Chat service unavailable",
      details: error.message || error
    });
  }
};