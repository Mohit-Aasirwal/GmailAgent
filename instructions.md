### Supervisor agent
    - agent which calls a specialist agent
    - agent receives prompt from user
    - agent can end the process or ask from user a different prompt.
    - every state will be updated to it. 
    - will extract the fileName and email from 

### Specialist agent

    - can call tools
    - will receive data from the supervisor.
    - will return the end result to the supervisor agent.

### Gmail tool

    - get the user details.
    - send the gmail to specific person.
    - return the status back to specialist agent.