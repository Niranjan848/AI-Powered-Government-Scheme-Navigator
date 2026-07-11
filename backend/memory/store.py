from dataclasses import dataclass, field


@dataclass
class ConversationMemory:
    conversation_id: str
    facts: dict[str, str] = field(default_factory=dict)


def save_memory(memory: ConversationMemory) -> ConversationMemory:
    return memory
