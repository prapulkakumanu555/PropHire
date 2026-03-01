export interface Vendor {
    id: number | string;
    name: string;
    email: string;
    phone: string;
    company: string;
    status: 'Active' | 'Inactive';
}
