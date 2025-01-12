const specialistAgent = async (
  data: typeof GraphState.State,
  config?: RunnableConfig
) => {
  const result = await llm
    .bindTools([searchInternetTool])
    .invoke(data.specialist_msgs, config);

  //Tool Call or response to supervisor
  if (result.tool_calls?.length) {
    console.log("ye line chali h");
    return new Command({
      goto: "tool_node",
      update: { specialist_msgs: [result] },
    });
  }

  return new Command({
    goto: "supervisorAgent",
    update: {
      supervisor_msgs: [
        new AIMessage({ content: result.content, name: "supervisorAgent" }),
      ],
    },
  });
};
