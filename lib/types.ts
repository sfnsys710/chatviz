
type Role = 'assistant' | 'user' | 'system';

export type Message = {
    id: string;
    role: Role;
    content: string;
}

export type SalesRow = {
    date: string;
    product: 'Widget A' | 'Widget B' | 'Gadget X' | 'Gadget Y';
    region: 'North' | 'South' | 'East';
    units_sold: number;
    revenue: number;
    satisfaction: number;
}