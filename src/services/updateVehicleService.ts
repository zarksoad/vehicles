import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const updateVehicleService = async (
  vehicle: FormData,
  vehicleId: number,
): Promise<void> => {
  try {
    // Retrieve token from AsyncStorage
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      console.error('Access token not found');
      return;
    }

    // Make the PATCH request
    const response = await axios.patch(
      `${API_URL}/vehicles/${vehicleId}`,
      vehicle,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    // Handle the response
    if (response.status >= 200 && response.status < 300) {
      console.log('Vehicle successfully updated:', response.data);
    } else {
      console.error('Failed to update vehicle:', {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
      });
    }
  } catch (error: unknown) {
    // Handle Axios errors
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', {
        message: error.message,
        code: error.code,
        response: error.response,
      });
    } else if (error instanceof Error) {
      // Handle other known errors
      console.error('General error:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
    } else {
      // Handle unknown errors
      console.error('Unknown error:', error);
    }
  }
};
