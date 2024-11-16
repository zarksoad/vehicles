import axios from 'axios';
import {Vehicle} from './types/vehicleType';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getVehicles = async (
  page: number = 1,
): Promise<{vehicles: Vehicle[]; metadata: any}> => {
  try {
    const token = await AsyncStorage.getItem('accessToken');

    if (!token) {
      console.error('No token found');
      return {vehicles: [], metadata: {}};
    }

    const response = await axios.get(`${API_URL}/vehicles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
      },
    });
    console.log(
      '*************',
      response.data.data,
      '************************',
    );

    if (response.status === 200) {
      return {
        vehicles: response.data.data,
        metadata: response.data.metadata,
      };
    }

    console.error('Failed to retrieve vehicles. Status:', response.status);
    return {vehicles: [], metadata: {}};
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching vehicles:', error);
    }
    return {vehicles: [], metadata: {}};
  }
};
