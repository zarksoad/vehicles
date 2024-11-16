import { getVehicle } from '../services/getVehicleService';
import { Vehicle } from '../services/types/vehicleType';
import {useEffect, useState} from 'react';

export const useVehicle = (vehicleId: number) => {
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      setLoading(true);
      try {
        const data = await getVehicle(vehicleId);
        if (data) {
          setVehicle(data);
        } else {
          setError('vehicle not found');
        }
      } catch (err) {
        console.error('Failed to fetch vehicle:', err);
        setError('Failed to fetch vehicle');
      } finally {
        setLoading(false);
      }
    };

    if (vehicleId) {
      fetchVehicle();
    }
  }, [vehicleId]);

  return {vehicle, loading, error};
};
