import type { Package, PackageUpdate } from '@/Types/package';
import axiosInstance from './axiosInstance';
import { isAxiosError } from 'axios';
//create Package
export async function createPackage(data: PackageUpdate): Promise<Package> {
  try {
    const response = await axiosInstance.post<Package>('/packages/new', data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      // Axios-specific error handling
      const message = error.response?.data?.message || error.message;
      throw new Error(`Axios error: ${message}`);
    } else {
      // Generic error
      throw new Error('Unknown error occurred while creating package');
    }
  }
}
//get all packages
export async function getAllPackages(): Promise<Package[]> {
  try {
    const response = await axiosInstance.get<Package[]>('/packages');
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(`Axios error: ${message}`);
    } else {
      throw new Error('Unknown error occurred while fetching packages');
    }
  }
}
//get package by id
export async function getPackageById(packageId: string): Promise<Package | null> {
  try {
    const response = await axiosInstance.get<Package[]>(`/packages/${packageId}`);
    return response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(`Axios error: ${message}`);
    } else {
      throw new Error('Unknown error occurred while fetching package');
    }
  }
}

//update package
export async function updatePackage(packageId: string, data: PackageUpdate): Promise<Package>
{
  try {
    const response = await axiosInstance.put<Package>(`/packages/${packageId}`, data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(`Axios error: ${message}`);
    } else {
      throw new Error('Unknown error occurred while updating package');
    }
  }
}