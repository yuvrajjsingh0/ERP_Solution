import Client from "./Client";
import Package from "./Package";

export default interface Payment{
    id?: number;
    client_id: number;
    mode: string;
    amount?: number;
    meta?: string;
    package_id?: number;
    created_at?: String;
    updated_at?: String;

    client? : Client;
    package?: Package;
}