
type Role = 'assistant' | 'user' | 'system';

export type Message = {
    id: string;
    role: Role;
    content: string;
}