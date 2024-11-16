import React from 'react';
import {
  ActivityIndicator,
  View,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import styles from './vehiclePage.style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Icon, Text} from '@ui-kitten/components';
import {useVehicle} from '../../hooks/useGetVehicle';
import {useDeleteVehicle} from '../../hooks/useDeleteVehicle';

export type VehiclePageRouteProp = RouteProp<RootStackParamList, 'VehiclePage'>;
export type UpdateVehicleRoutePageProp = NativeStackNavigationProp<
  RootStackParamList,
  'UpdateVehiclePage'
>;

export interface VehiclePageProps {
  route: VehiclePageRouteProp;
  navigation: UpdateVehicleRoutePageProp;
}

const VehiclePage: React.FC<VehiclePageProps> = ({route, navigation}) => {
  const {vehicleId} = route.params;
  console.log('*****', vehicleId, '*******');
  const {vehicle, loading, error} = useVehicle(vehicleId);
  const {
    loading: deleting,
    error: deleteError,
    handleDeleteVehicle,
  } = useDeleteVehicle();

  const handleDelete = () => {
    Alert.alert(
      'Delete Vehicle',
      'Are you sure you want to delete this vehicle?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            const success = await handleDeleteVehicle(vehicleId);
            if (success) {
              Alert.alert('Vehicle has been deleted');
              navigation.goBack();
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const navigateToUpdate = () => {
    console.log('this is the vehicleId', vehicleId, '****************');
    navigation.navigate('UpdateVehiclePage', {vehicleId});
  };

  if (loading || deleting) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (deleteError) {
    return (
      <View style={styles.container}>
        <Text>Error deleting vehicle: {deleteError}</Text>
      </View>
    );
  }

  if (!vehicle) {
    return (
      <View style={styles.container}>
        <Text>No vehicle found</Text>
      </View>
    );
  }

  const defaultImageUri = require('../../assets/default-image.jpg');

  return (
    <View style={styles.container}>
      <View style={styles.vehicleCard}>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigateToUpdate()}>
            <Icon name="edit" style={[styles.icon, styles.updateIcon]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleDelete}>
            <Icon name="trash-2" style={[styles.icon, styles.trashIcon]} />
          </TouchableOpacity>
        </View>
        <Image
          source={vehicle.photo ? {uri: vehicle.photo} : defaultImageUri}
          style={styles.vehicleImage}
        />
        <Text style={styles.vehicleName}>
          {vehicle.make} {vehicle.model} ({vehicle.year})
        </Text>
        <Text style={styles.vehicleLicensePlate}>
          License Plate: {vehicle.licensePlate}
        </Text>
        <View style={styles.vehicleInfo}>
          <Text style={styles.infoLabel}>Vehicle Info:</Text>
          <Text style={styles.infoText}>
            <Icon name="car" style={styles.infoIcon} />
            {vehicle.make} {vehicle.model}
          </Text>
          <Text style={styles.infoText}>
            <Icon name="calendar" style={styles.infoIcon} />
            Year: {vehicle.year}
          </Text>
          <Text style={styles.infoText}>
            <Icon name="clipboard" style={styles.infoIcon} />
            License Plate: {vehicle.licensePlate}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default VehiclePage;
