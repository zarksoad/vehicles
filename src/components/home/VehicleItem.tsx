import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {Text} from '@ui-kitten/components';
import styles from '../../screens/home/HomeView.style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {useNavigation} from '@react-navigation/native';
import {Vehicle} from '../../services/types/vehicleType';

interface VehicleItemProps {
  vehicle: Vehicle;
  onPress: (id: number) => void;
}

type NavigationVehicle = NativeStackNavigationProp<
  RootStackParamList,
  'VehiclePage'
>;

const VehicleItem: React.FC<VehicleItemProps> = ({vehicle, onPress}) => {
  const navigation = useNavigation<NavigationVehicle>();

  const handlePress = () => {
    if (vehicle && vehicle.id !== undefined) {
      onPress(vehicle.id);
      navigation.navigate('VehiclePage', {vehicleId: vehicle.id});
    } else {
      console.warn(
        `vehicle Id is undefined for ${vehicle?.make || 'Unknown vehicle'}`,
      );
    }
  };

  const defaultImageUri = require('../../assets/default-image.jpg');

  return (
    <Pressable onPress={handlePress} style={styles.vehicleItem}>
      <View style={styles.containerImage}>
        <Image
          source={vehicle?.photo ? {uri: vehicle.photo} : defaultImageUri}
          style={styles.vehicleImage}
        />
      </View>
      <View style={styles.vehicleDetails}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.vehicleName}>
            {vehicle?.make || 'Unknown Make'}{' '}
            {vehicle?.model || 'Unknown Model'}
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
          <Text style={styles.vehicleYear}>
            {vehicle?.year || 'Unknown Year'}
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
          <Text style={styles.vehicleLicensePlate}>
            {vehicle?.licensePlate || 'Unknown License Plate'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default VehicleItem;
