import { tool } from "@langchain/core/tools";
import {
  GmailCreateDraft,
  GmailGetMessage,
  GmailGetThread,
  GmailSearch,
  GmailSendMessage,
} from "@langchain/community/tools/gmail";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { StructuredTool } from "@langchain/core/tools";
import { llm } from "../LLM/ChatVertexAI";
import { GraphState } from "../state/GraphState";

const tools: StructuredTool[] = [
  new GmailCreateDraft(),
  new GmailGetMessage(),
  new GmailGetThread(),
  new GmailSearch(),
  new GmailSendMessage(),
];

const gmailAgent = await initializeAgentExecutorWithOptions(tools, llm, {
  // agentType: "structured-chat-zero-shot-react-description",
  verbose: true,
});
export const gmailTool = tool(
  async ({ question }) => {
    const response = await gmailAgent.invoke({ input: question });
    return response.content;
  },
  {
    name: "gmailTool",
    description: `use this method to send, receive and reply to emails.`,
    schema: z.object({
      response: z.string().describe("message to user or specialist agent"),
      to: z.enum(["user", "specialist"]).describe("recipient of the message"),
    }),
  }
);

const toolNode = new ToolNode([gmailTool]);
const workflow = new StateGraph(GraphState)
  .addNode("supervisorAgent", supervisorAgent, {
    ends: ["specialistAgent", "__end__"],
  })
  .addNode("specialistAgent", specialistAgent, {
    ends: ["supervisorAgent", "tool_node"],
  })
  .addNode("tool_node", callTool, {
    ends: ["specialistAgent"],
  })
  .addEdge("__start__", "supervisorAgent");

export const graph = workflow.compile();
