export default interface Client{
    id?: number;
    name: string;
    email: string;
    phone_num: string;
    category?: string;
    package_id?: number;
    created_at?: string;
    updated_at?: string;
}