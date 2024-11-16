import React, { useEffect, useState } from 'react';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import CreateContactForm from './src/screens/create/createVehicleView';
import Home from './src/screens/home/HomeView';
import LoginView from './src/screens/auth/LoginView';
import RegisterView from './src/screens/auth/RegisterView';
import VehiclePage from './src/screens/SingleContact/singleVehiclePage';
import UpdateVehiclePage from './src/screens/SingleContact/updateContact/updateVehiclePage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './src/components/Header';

export interface RootStackParamList extends ParamListBase {
  Home: undefined;
  CreateVehicle: undefined;
  VehiclePage: { vehicleId: number };
  UpdateVehiclePage: { vehicleId: number };
  login: undefined;
  register: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching token:', error);
        setIsLoggedIn(false);
      }
    };

    checkToken();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'login'}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="CreateVehicle" component={CreateContactForm} />
          <Stack.Screen name="VehiclePage" component={VehiclePage} />
          <Stack.Screen name="UpdateVehiclePage" component={UpdateVehiclePage} />
          {!isLoggedIn && (
            <>
              <Stack.Screen name="login" component={LoginView} />
              <Stack.Screen name="register" component={RegisterView} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

export default App;
