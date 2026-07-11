# Judge Questions

## Mentor Questions

1. What inspired the product idea?
2. Why is this a real user pain point?
3. What makes the solution better than a search engine?
4. How will you keep the scheme data current?
5. How do you reduce false recommendations?
6. What is the core hackathon MVP?
7. Which features are production-ready today?
8. What would you prioritize after the demo?
9. How do you measure user success?
10. What government stakeholders would use this?

## Technical Questions

1. Why FastAPI instead of Flask?
2. Why LangGraph instead of a single prompt chain?
3. Why use Redis for memory?
4. Why use PostgreSQL for persistence?
5. How is FAISS used in retrieval?
6. How do you handle prompt injection?
7. How do you validate user input?
8. How is file upload secured?
9. How do you structure your API responses?
10. How do you test the agent workflow?

## AI Agent Questions

1. What planning step does the agent perform?
2. How does it decide when to ask a follow-up question?
3. What memory is stored long term?
4. How does retrieval influence reasoning?
5. How do you ensure explainability?
6. What tools does the agent use?
7. How are recommendations ranked?
8. How is the checklist generated?
9. How does the agent recover from missing data?
10. How does the workflow remain deterministic enough for demos?

## Architecture Questions

1. How does the frontend communicate with the backend?
2. What is the role of the orchestrator?
3. Where is state stored?
4. How does the system scale retrieval?
5. What fails over if Redis is unavailable?
6. How are notifications generated?
7. How do admins monitor ingestion quality?
8. How do you isolate the vector index by tenant or environment?
9. How does the system support new states quickly?
10. What is the deployment topology?

## Scalability Questions

1. How many conversations can the system support?
2. Can retrieval be horizontally scaled?
3. How do you batch document ingestion?
4. How do you reduce LLM calls?
5. What is cached and for how long?
6. How do you handle spikes during launches?
7. Can recommendations be precomputed?
8. How do you partition data by state?
9. How do you monitor latency?
10. How do you track cost per user?

## Security Questions

1. How are passwords stored?
2. How do JWTs expire and refresh?
3. How do you prevent unauthorized access?
4. How do you sanitize uploads?
5. How do you prevent prompt injection?
6. How do you rate limit abuse?
7. How do you audit admin actions?
8. How do you protect personal data?
9. How do you log safely?
10. How do you handle revoked sessions?
