import { Router } from "express";
import { handleChat } from "./chatbot.controller";

const chatbotRouter = Router();

chatbotRouter.post("/", handleChat);

export default chatbotRouter;