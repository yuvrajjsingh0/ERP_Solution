export default interface Package{
    id?: number;
    name: string,
    frequency: string,
    price: number;
    description?: string;
    meta?: string;
    created_at?: String;
    updated_at?: String;
}