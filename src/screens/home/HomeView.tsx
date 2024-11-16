import React, {useState} from 'react';
import {
  View,
  ActivityIndicator,
  SectionList,
  SectionListData,
  Pressable,
  Text as RNText,
} from 'react-native';
import {Text, Divider} from '@ui-kitten/components';
import styles from './HomeView.style';
import {useVehicles} from '../../hooks/useGetVehicles';
import VehicleItem from '../../components/home/VehicleItem';
import {Vehicle} from '../../services/types/vehicleType';
import CreateVehicle from '../../components/home/createVehicleButton';
import Header from '../../components/Header';

interface VehicleSection extends SectionListData<Vehicle> {
  title: string;
}

const groupVehiclesByMake = (vehicles: Vehicle[]): VehicleSection[] => {
  const groupedVehicles: {[key: string]: Vehicle[]} = {};

  vehicles.forEach(vehicle => {
    const make = vehicle.make.charAt(0).toUpperCase();
    if (!groupedVehicles[make]) {
      groupedVehicles[make] = [];
    }
    groupedVehicles[make].push(vehicle);
  });

  return Object.keys(groupedVehicles)
    .sort()
    .map(make => ({
      title: make,
      data: groupedVehicles[make],
    }));
};

const Home: React.FC = () => {
  const {vehicles, loading, currentPage, totalPages, setCurrentPage} =
    useVehicles();
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(
    null,
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const handleVehiclePress = (id: number) => {
    setSelectedVehicleId(prevId => (prevId === id ? null : id));
  };

  const groupedVehicles = groupVehiclesByMake(vehicles);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={groupedVehicles}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({item}) => (
          <VehicleItem
            vehicle={item}
            onPress={() => handleVehiclePress(item.id)}
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text
            category="h6"
            style={{paddingVertical: 8, paddingHorizontal: 16}}>
            {title}
          </Text>
        )}
        stickySectionHeadersEnabled={true}
        ItemSeparatorComponent={() => <Divider style={{marginVertical: 4}} />}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <Pressable
          onPress={goToPreviousPage}
          disabled={currentPage === 1}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#ddd' : '#007bff',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
            },
            currentPage === 1 && {backgroundColor: '#bbb'},
          ]}>
          <RNText style={{color: 'white'}}>Previous</RNText>
        </Pressable>
        <Pressable
          onPress={goToNextPage}
          disabled={currentPage === totalPages}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#ddd' : '#007bff',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
            },
            currentPage === totalPages && {backgroundColor: '#bbb'},
          ]}>
          <RNText style={{color: 'white'}}>Next</RNText>
        </Pressable>
      </View>
      <CreateVehicle />
    </View>
  );
};

export default Home;
