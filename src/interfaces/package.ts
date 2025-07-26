export const PackageStatus = {
    CREATED: 'CREATED',
    PICKED_UP: 'PICKED_UP',
    IN_TRANSIT: 'IN_TRANSIT',
    OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
    DELIVERED: 'DELIVERED',
    EXCEPTION: 'EXCEPTION',
    CANCELLED: 'CANCELLED',
} as const;

export type PackageStatus = typeof PackageStatus[keyof typeof PackageStatus];

export interface IPackageEvent {
    status: PackageStatus;
    timestamp: string;
    lat?: number;
    lon?: number;
    note?: string;
}

export interface IPackage {
    _id?: string;
    package_id: string;
    current_status: PackageStatus;
    current_lat?: number;
    current_lon?: number;
    last_updated: string;
    event_history: IPackageEvent[];
    eta?: string;
    received_at?: string;
    current_status_timestamp?: string;
    is_stuck_alert_triggered?: boolean;
}

export interface IAlert {
    _id: string;
    package_id: string;
    alert_type: string;
    message: string;
    type: 'info' | 'warning' | 'error';
    timestamp: string;
}
