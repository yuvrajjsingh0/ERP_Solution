export default interface WorkerPayout{
    id?: number;
    worker_id: number;
    mode: string;
    amount: number;
    meta: string;
    created_at?: String;
    updated_at?: String;
}