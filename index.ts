import crypto from "crypto";
import fs from "fs";
import "dotenv/config";
import { Annotation, Command, StateGraph } from "@langchain/langgraph";
import {
  AIMessage,
  BaseMessage,
  HumanMessage,
  SystemMessage,
  ToolMessage,
} from "@langchain/core/messages";
import { z } from "zod";
import {
  SUPERVISOR_PROMPT,
  SPECIALIST_PROMPT,
} from "./src/constants/prompts.js";
import { response_tool } from "./src/tools/responseTool.js";

const OutputSchema = z.object({
  response: z.string().describe("message to user or specialist agent"),
  to: z.enum(["user", "specialist"]).describe("recipient of the message"),
});

const responseTool = response_tool;

console.log("chal rha h");
// UNCOMMENT TO ENCRYPT GET THE GEMINI KEY
// const encryptedData = fs.readFileSync("gemini.txt", "utf8");
// const decryptedData = decryptData(encryptedData);
// fs.writeFileSync("gemini_key.json", JSON.parse(decryptedData));

// process.env.GOOGLE_APPLICATION_CREDENTIALS = "gemini_key.json";
// useAgent("What is the weather in Tokyo ?");
