export interface Package {
  id: string;
  package_id: string;
  status: PackageStatus;
  lat?: number;
  lon?: number;
  event_timestamp: string;
  received_at: string;
  note?: string;
  eta?: string;
  created_at: string;
  updated_at: string;
}

export enum PackageStatus {
  CREATED = 'CREATED',
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  EXCEPTION = 'EXCEPTION',
  CANCELLED = 'CANCELLED'
}

export interface PackageUpdate {
  package_id: string;
  status: PackageStatus;
  lat?: number;
  lon?: number;
  timestamp: string;
  note?: string;
}

export interface Alert {
  id: string;
  package_id: string;
  message: string;
  created_at: string;
  resolved: boolean;
}
