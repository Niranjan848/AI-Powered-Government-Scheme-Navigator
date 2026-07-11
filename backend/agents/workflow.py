from dataclasses import dataclass


@dataclass
class AgentState:
    goal: str
    missing_fields: list[str]
    memory_hits: list[str]


def build_workflow(goal: str) -> AgentState:
    return AgentState(goal=goal, missing_fields=[], memory_hits=[])
