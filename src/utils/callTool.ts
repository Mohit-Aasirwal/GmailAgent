import { RunnableConfig } from "@langchain/core/runnables";
import { GraphState } from "../state/GraphState";

export const callTool = async (
  data: typeof GraphState.State,
  config?: RunnableConfig
) => {
  const lastMessage = data.specialist_msgs[data.specialist_msgs.length - 1];
  console.log(lastMessage);

  //Agent is trying to get information from the internet
  const response = await toolNode.invoke({ messages: [lastMessage] });

  console.log(response);

  return new Command({
    goto: "specialistAgent",
    update: {
      specialist_msgs: [
        new ToolMessage({
          content: response.content,
          name: response.name,
          tool_call_id: response.tool_call_id,
        }),
      ],
    },
  });
};
