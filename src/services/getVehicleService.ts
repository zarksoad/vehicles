import {API_URL} from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Vehicle} from './types/vehicleType';

export const getVehicle = async (
  contactId: number,
): Promise<Vehicle | undefined> => {
  try {
    const token = await AsyncStorage.getItem('accessToken');

    if (!token) {
      console.error('No token found');
      return;
    }
    const response = await axios.get(`${API_URL}/vehicles/${contactId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.data as Vehicle;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching contact from API:', error.message);
    } else {
      console.error('Unexpected error fetching contact:', error);
    }
    return undefined;
  }
};
