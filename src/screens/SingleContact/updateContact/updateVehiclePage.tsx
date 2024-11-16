import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../App';
import UpdateForm from './updateVehicle';


type UpdateVehiclePageProps = {
  route: RouteProp<RootStackParamList, 'UpdateVehiclePage'>;
};

const UpdateVehiclePage: React.FC<UpdateVehiclePageProps> = ({ route }) => {
  const { vehicleId } = route.params;  
  return <UpdateForm vehicleId={vehicleId} />;
};

export default UpdateVehiclePage;
