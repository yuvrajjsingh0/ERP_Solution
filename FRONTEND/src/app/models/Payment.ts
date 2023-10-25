import Client from "./Client";
import Package from "./Package";

export default interface Payment{
    id?: number;
    client_id: number;
    mode: string;
    amount?: number;
    meta?: string;

    fee?: number;
    tax?: number;
    total?: number;
    late_fee?: number;
    from?: string;
    to?: string;
    due?: number;

    package_id?: number;
    created_at?: String;
    updated_at?: String;

    client? : Client;
    package?: Package;
}