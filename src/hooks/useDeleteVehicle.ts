import {useState} from 'react';
import {deleteVehicleService} from '../services/deleteContactService';

export const useDeleteVehicle = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteVehicle = async (vehicleId: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteVehicleService(vehicleId);
      return true;
    } catch (err) {
      setError('Failed to delete contact');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {loading, error, handleDeleteVehicle};
};
