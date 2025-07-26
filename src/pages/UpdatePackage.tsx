import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { getPackageById, updatePackage } from "@/api/packageApi";
import type { Package, PackageUpdate, PackageStatus } from "@/Types/package";

const statuses: PackageStatus[] = [
  "CREATED",
  "PICKED_UP",
  "IN_TRANSIT",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "EXCEPTION",
  "CANCELLED",
];

const UpdatePackagePage = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState<Package | null>(null);
  const [formData, setFormData] = useState<PackageUpdate>({
    package_id: "",
    status: "CREATED",
    lat: undefined,
    lon: undefined,
    timestamp: new Date().toISOString(),
    note: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!packageId) return;
    async function fetchPackage() {
      setLoading(true);
      try {
        const data = await getPackageById(packageId);
        if (data) {
          setPkg(data);
          setFormData({
            package_id: data.package_id,
            status: data.current_status,
            lat: data.current_lat,
            lon: data.current_lon,
            timestamp: new Date().toISOString(),
            note: "",
          });
        } else {
          setError("Package not found");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchPackage();
  }, [packageId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "lat" || name === "lon"
          ? value === "" ? undefined : Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await updatePackage(packageId!, formData);
      alert("Package updated successfully!");
      navigate("/"); 
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center text-blue-500">Loading package...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!pkg) return <p className="text-center">Package not found</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Update Package: {pkg.package_id}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Status */}
        <label className="block">
          <span className="font-semibold">Status</span>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded border border-gray-300 p-2"
            required
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </label>

        {/* Latitude */}
        <label className="block">
          <span className="font-semibold">Latitude</span>
          <input
            type="number"
            step="0.0001"
            name="lat"
            value={formData.lat ?? ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded border border-gray-300 p-2"
            placeholder="Latitude"
          />
        </label>

        {/* Longitude */}
        <label className="block">
          <span className="font-semibold">Longitude</span>
          <input
            type="number"
            step="0.0001"
            name="lon"
            value={formData.lon ?? ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded border border-gray-300 p-2"
            placeholder="Longitude"
          />
        </label>

       

        {/* Note */}
        <label className="block">
          <span className="font-semibold">Note</span>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="mt-1 block w-full rounded border border-gray-300 p-2"
            placeholder="Add a note (optional)"
            rows={3}
          />
        </label>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <Link
            to="/packages"
            className="text-gray-600 hover:text-gray-900 underline"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {saving ? "Saving..." : "Update Package"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePackagePage;
