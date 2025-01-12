import { RunnableConfig } from "@langchain/core/runnables";
import { GraphState } from "../state/GraphState";
import { llm } from "../LLM/ChatVertexAI";
import { response_tool } from "../tools/responseTool";

const supervisorAgent = async (
  data: typeof GraphState.State,
  config?: RunnableConfig
) => {
  const result = await llm
    .bindTools([response_tool], { tool_choice: "response_tool" })
    .invoke(data.supervisor_msgs, config);

  if (!result?.tool_calls?.length)
    return console.error("No tool call by agent");

  const toolCall = result.tool_calls[0];
  const { to, response } = toolCall.args;

  if (to === "specialist") {
    return new Command({
      goto: "specialistAgent",
      update: {
        specialist_msgs: [
          new HumanMessage({ content: response, name: "specialist" }),
        ],
        supervisor_msgs: [
          new AIMessage({ content: response, name: "supervisor" }),
        ],
      },
    });
  }
  //Respond to user
  return new Command({
    goto: "__end__",
    update: {
      supervisor_msgs: [
        new AIMessage({ content: response, name: "supervisor" }),
      ],
    },
  });
};
