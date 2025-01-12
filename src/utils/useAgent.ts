import { graph } from "../agents/gmail.agent";

export const useAgent = async (userMessage: string) => {
  console.log("ye hai result");
  const result = await graph.invoke({
    supervisor_msgs: [new HumanMessage({ content: userMessage })],
  });
  // console.log("ye line chali h");
  const lastMessage = result.supervisor_msgs[result.supervisor_msgs.length - 1];
  console.log("last message aaya hai", lastMessage);
  return lastMessage;
};
