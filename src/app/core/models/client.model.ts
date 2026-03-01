export interface ClientContact {
    id: number | string;
    name: string;
    email: string;
    phone: string;
}

export interface Client {
    id: number | string;
    name: string;
    address: string;
    industry: string;
    contacts: ClientContact[];
    createdAt: string;
}
