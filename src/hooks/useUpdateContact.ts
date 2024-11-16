import {useState} from 'react';
import {updateVehicleService} from '../services/updateVehicleService';

export const useUpdateVehicle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateVehicle = async (
    vehicleData: FormData,
    vehicleId: number,
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await updateVehicleService(vehicleData, vehicleId);
      console.log('Vehicle updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update vehicle');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateVehicle,
    isLoading,
    error,
  };
};
