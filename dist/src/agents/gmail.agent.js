"use strict";
const GraphState = Annotation.Root({
    supervisor_msgs: Annotation({
        reducer: (prevState, newState) => prevState.concat(newState),
        default: () => [new SystemMessage(SUPERVISOR_PROMPT)],
    }),
    specialist_msgs: Annotation({
        reducer: (prevState, newState) => prevState.concat(newState),
        default: () => [new SystemMessage(ANALYST_PROMPT)],
    }),
});
const OutputSchema = z.object({
    response: z.string().describe("message to user or specialist agent"),
    to: z.enum(["user", "specialist"]).describe("recipient of the message"),
});
const response_tool = tool(async (x) => x, {
    name: "response_tool",
    description: `Always use this tool to respond.`,
    schema: OutputSchema,
});
const toolNode = new ToolNode([searchInternetTool]);
