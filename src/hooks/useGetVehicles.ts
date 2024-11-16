import {useState, useEffect} from 'react';
import React from 'react';
import {getVehicles} from '../services/getAllVehiclesService';
import {useFocusEffect} from '@react-navigation/native';
import {Vehicle} from '../services/types/vehicleType';

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchVehicles = async (page: number) => {
    setLoading(true);
    try {
      const {vehicles: newVehicles, metadata} = await getVehicles(page);
      setVehicles(prevVehicles =>
        page === 1 ? newVehicles : [...prevVehicles, ...newVehicles],
      );
      setTotalPages(metadata.totalPages);
    } catch (err) {
      console.error('Failed to fetch vehicles:', err);
      setError('Failed to fetch vehicles');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchVehicles(currentPage);
    }, [currentPage]),
  );

  useEffect(() => {
    fetchVehicles(currentPage);
  }, [currentPage]);

  return {
    vehicles,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
  };
};
