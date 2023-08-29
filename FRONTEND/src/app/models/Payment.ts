export default interface Payment{
    id?: number;
    client_id: number;
    mode: string;
    amount?: number;
    meta?: string;
    package_id?: number;
    created_at?: String;
    updated_at?: String;
}