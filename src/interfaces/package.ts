export enum PackageStatus {
    CREATED = 'CREATED',
    PICKED_UP = 'PICKED_UP',
    IN_TRANSIT = 'IN_TRANSIT',
    OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
    DELIVERED = 'DELIVERED',
    EXCEPTION = 'EXCEPTION',
    CANCELLED = 'CANCELLED',
}

export interface IPackageEvent {
    status: PackageStatus;
    lat?: number;
    lon?: number;
    timestamp: string;
    note?: string;
}

export interface IPackage {
    _id: string;
    package_id: string;
    current_status: PackageStatus;
    current_lat?: number;
    current_lon?: number;
    current_status_timestamp: string;
    eta?: string;
    received_at: string;
    last_updated: string;
    event_history: IPackageEvent[];
    is_stuck_alert_triggered?: boolean;
    __v?: number;
}

export interface IAlert {
    _id: string;
    package_id: string;
    alert_type: string;
    message: string;
    timestamp: string;
    resolved: boolean;
    resolved_at?: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}