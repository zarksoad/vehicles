import axios from 'axios';
import {API_URL} from '@env';

export interface LoginResponse {
  access_token: string;
}

export const loginService = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    console.log(API_URL);
    console.log(email, password, 'credentials');
    console.log('Sending request to:', API_URL);

    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    console.log('Response data:', response.data);

    let {access_token} = response.data.data;

    if (!access_token) {
      throw new Error('No access token returned from the backend.');
    }
    console.log(access_token, '|||||||||||||||||||||||||||||||||||');
    return {access_token};
  } catch (error: any) {
    const message = error.response?.data?.message || 'Login failed';
    console.error('Error during login:', message);
    throw new Error(message);
  }
};
