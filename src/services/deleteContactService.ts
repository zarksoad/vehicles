import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const deleteVehicleService = async (
  vehicleId: number,
): Promise<void> => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      console.error('No token found');
      return;
    }
    await axios.delete(`${API_URL}/vehicles/${vehicleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`Contact with id ${vehicleId} deleted successfully`);
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw new Error('Failed to delete contact');
  }
};
