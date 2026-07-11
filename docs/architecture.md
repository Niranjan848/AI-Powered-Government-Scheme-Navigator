# System Architecture and Workflow

## High-Level Architecture

```mermaid
flowchart TD
    U[USER] --> F[React Frontend Vite]
    F --> B[FastAPI Backend API]
    B --> G[LangGraph Agent]
    B --> P[PostgreSQL]
    B --> C[Redis Memory]
    G --> T[Tool Orchestrator]
    T --> L[Gemini API]
    T --> V[FAISS Vector DB]
    T --> X[PyMuPDF Parser]
    X --> K[Government PDFs Knowledge Base]
    G --> E[Eligibility Engine]
    E --> R[Recommendation Engine]
    R --> D[Checklist Dashboard History]
```

## LangGraph State Diagram

```mermaid
flowchart TD
    S([START]) --> U[Understand User Goal]
    U --> M[Retrieve Memory]
    M --> C[Check Missing Fields]
    C --> Q{Need More Information?}
    Q -- Yes --> A[Ask Question]
    A --> R[Receive Answer]
    R --> C
    Q -- No --> D[Retrieve Documents]
    D --> S2[Semantic Search]
    S2 --> E[Reason Eligibility]
    E --> N[Rank Schemes]
    N --> X[Generate Explanation]
    X --> L[Generate Checklist]
    L --> W[Store Memory]
    W --> Z([END])
```

## ER Diagram

```mermaid
erDiagram
    USERS ||--|| PROFILES : has
    USERS ||--o{ CHATS : starts
    CHATS ||--o{ CONVERSATION_MEMORY : stores
    USERS ||--o{ RECOMMENDATIONS : receives
    GOVERNMENT_SCHEMES ||--o{ RECOMMENDATIONS : referenced_by
    USERS ||--o{ BOOKMARKS : saves
    DOCUMENTS ||--o{ GOVERNMENT_SCHEMES : describe
    ADMIN ||--o{ NOTIFICATIONS : sends
    USERS ||--o{ NOTIFICATIONS : receives
```

## UML Sequence Diagram

```mermaid
sequenceDiagram
    actor Citizen
    participant Frontend
    participant FastAPI
    participant LangGraph
    participant FAISS
    participant Gemini
    participant PostgreSQL
    participant Redis

    Citizen->>Frontend: Ask about a scheme
    Frontend->>FastAPI: POST /chat
    FastAPI->>LangGraph: Start agent run
    LangGraph->>Redis: Retrieve memory
    LangGraph->>FAISS: Search documents
    LangGraph->>Gemini: Reason and explain
    LangGraph->>PostgreSQL: Save chat and recommendation
    LangGraph-->>FastAPI: Structured response
    FastAPI-->>Frontend: Dashboard payload
    Frontend-->>Citizen: Answer and checklist
```

## Use Case Diagram

```mermaid
flowchart LR
    C[Citizen] --> UC1[Signup and Login]
    C --> UC2[Chat with AI Assistant]
    C --> UC3[View Recommendations]
    C --> UC4[Bookmark Schemes]
    A[Admin] --> UA1[Upload PDFs]
    A --> UA2[Review Analytics]
    A --> UA3[Manage Notifications]
```

## Class Diagram

```mermaid
classDiagram
    class User {
      id
      email
      role
    }
    class Profile {
      user_id
      state
      category
      readiness_score
    }
    class Conversation {
      id
      user_id
      summary
    }
    class Recommendation {
      id
      scheme_id
      score
      explanation
    }
    class Scheme {
      id
      name
      ministry
      tags
    }
    User "1" --> "1" Profile
    User "1" --> "many" Conversation
    User "1" --> "many" Recommendation
    Recommendation --> Scheme
```

## System Flowchart

```mermaid
flowchart TD
    A[Start] --> B[Collect user profile]
    B --> C[Fetch memory]
    C --> D[Retrieve scheme documents]
    D --> E[Rank eligibility]
    E --> F[Generate explanation]
    F --> G[Build checklist]
    G --> H[Persist result]
    H --> I[Return dashboard response]
```
