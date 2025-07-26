// src/pages/CreatePackagePage.tsx
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { PackageStatus, type PackageUpdate } from '@/Types/package';
import { createPackage } from '@/api/packageApi';


export default function CreatePackagePage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PackageUpdate>();

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const onSubmit = async (data: PackageUpdate) => {
    setLoading(true);
    setSuccessMsg('');
    try {
      console.log(data)
      const result = await createPackage(data);
      setSuccessMsg(`Package ${result.package_id} created successfully!`);
      reset();
    } catch (error: any) {
      alert(error.message || 'Failed to create package.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-xl shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Package</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
       

        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            {...register('status', { required: 'Status is required' })}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
          >
            {Object.values(PackageStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Timestamp</label>
          <input
            type="datetime-local"
            {...register('timestamp', { required: 'Timestamp is required' })}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
          />
          {errors.timestamp && (
            <p className="text-red-500 text-sm mt-1">{errors.timestamp.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Note (optional)</label>
          <input
            type="text"
            {...register('note')}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            placeholder="Add a note"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Latitude</label>
            <input
              type="number"
              step="any"
              {...register('lat')}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Longitude</label>
            <input
              type="number"
              step="any"
              {...register('lon')}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Creating...' : 'Create Package'}
        </button>
      </form>

      {successMsg && (
        <div className="mt-4 text-green-600 font-semibold text-center">{successMsg}</div>
      )}
    </div>
  );
}
