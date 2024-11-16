import {useState} from 'react';
import { createVehicleService } from '../services/createVehicleService';
 // Use the updated service

export const useCreateVehicle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createVehicle = async (vehicleData: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await createVehicleService(vehicleData);
      console.log('Vehicle created successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to create vehicle');
    } finally {
      setIsLoading(false);
    }
  };

  return {createVehicle, isLoading, error};
};
