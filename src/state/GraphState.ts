import { BaseMessage } from "@langchain/core/messages";
import { Annotation } from "@langchain/langgraph";
import { SUPERVISOR_PROMPT, SPECIALIST_PROMPT } from "./constants/prompts.js";

export const GraphState = Annotation.Root({
  supervisor_msgs: Annotation<BaseMessage[]>({
    reducer: (prevState, newState) => prevState.concat(newState),
    default: () => [new SystemMessage(SUPERVISOR_PROMPT)],
  }),
  specialist_msgs: Annotation<BaseMessage[]>({
    reducer: (prevState, newState) => prevState.concat(newState),
    default: () => [new SystemMessage(SPECIALIST_PROMPT)],
  }),
});
