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
    timestamp: string;
    lat?: number;
    lon?: number;
    note?: string;
}

export interface IPackage {
    package_id: string;
    current_status: PackageStatus;
    current_lat?: number;
    current_lon?: number;
    last_updated: string;
    event_history: IPackageEvent[];
    _id?: string;
}

export interface IAlert {
    _id: string;
    package_id: string;
    alert_type: string;
    message: string;
    type: 'info' | 'warning' | 'error';
    timestamp: string;
}