from dataclasses import dataclass


@dataclass
class RetrievedChunk:
    source: str
    snippet: str
    score: float


def retrieve_documents(query: str) -> list[RetrievedChunk]:
    return [RetrievedChunk(source="demo.pdf", snippet=query, score=1.0)]
