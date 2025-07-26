import React, { useEffect, useState } from "react";
import { getAllPackages } from "@/api/packageApi"; 
import type { Package } from "@/Types/package";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Link } from "react-router";
const PackageList: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getAllPackages(); 
        setPackages(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Package List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Current Location</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packages.map((pkg) => (
            <TableRow key={pkg._id}>
              <TableCell>{pkg.package_id}</TableCell>
              <TableCell>{pkg.current_status}</TableCell>
              <TableCell>
                {pkg.current_lat}, {pkg.current_lon}
              </TableCell>
              <TableCell>
                {new Date(pkg.last_updated).toLocaleString()}
              </TableCell>
              <TableCell>
                <Link
                  to={`/package/${pkg.package_id}`}
                  className="text-blue-500 hover:underline"
                >
                  View
                </Link>
                {" | "}
                <Link
                  to={`/update/${pkg.package_id}`}
                  className="text-green-600 hover:underline"
                >
                  Edit
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PackageList;
