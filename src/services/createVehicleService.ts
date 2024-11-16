import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createVehicleService = async (
  vehicle: FormData 
): Promise<void> => {
  try {
    const token = await AsyncStorage.getItem('accessToken');

    if (!token) {
      console.error('No token found');
      return;
    }

    const response = await axios.post(`${API_URL}/vehicles`, vehicle, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // This is crucial for file uploads
      },
    });

    if (response.status === 201 || response.status === 200) {
      console.log('Vehicle successfully saved:', response.data);
    } else {
      console.error('Failed to save vehicle. Status:', response.status);
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
        response: error.response,
        config: error.config,
        code: error.code,
      });
    } else if (error instanceof Error) {
      console.error('General error:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
    } else {
      console.error('Unknown error:', error);
    }
  }
};
