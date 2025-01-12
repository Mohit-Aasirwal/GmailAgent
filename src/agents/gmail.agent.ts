
const toolNode = new ToolNode([searchInternetTool]);
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

const graph = workflow.compile();
