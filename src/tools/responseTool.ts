import { tool } from "@langchain/core/tools";
import { z } from "zod";

const OutputSchema = z.object({
  response: z.string().describe("message to user or specialist agent"),
  to: z.enum(["user", "specialist"]).describe("recipient of the message"),
});


export const response_tool = tool(async (x) => x, {
  name: "response_tool",
  description: `Always use this tool to respond.`,
  schema: OutputSchema,
});
