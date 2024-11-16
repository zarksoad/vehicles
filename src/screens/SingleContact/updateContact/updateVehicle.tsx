import React, { useState, useEffect } from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Icon } from '@ui-kitten/components';
import {
  checkOrRequestCameraPermission,
  checkOrRequestGalleryPermissions,
} from '../../../commun/permisions/checkOrOpen';
import styles from './updateVehicleStyle';
import { useVehicle } from '../../../hooks/useGetVehicle';
import { useUpdateVehicle } from '../../../hooks/useUpdateContact';

export interface UpdateFormProps {
  vehicleId: number;
  onSubmit?: (formData: FormData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

const UpdateForm: React.FC<UpdateFormProps> = ({
  vehicleId,
  onSubmit,
  isLoading = false,
  error = null,
}) => {
  const { vehicle, loading, error: fetchError } = useVehicle(vehicleId);
  const { updateVehicle, isLoading: updateLoading, error: updateError } = useUpdateVehicle(); 

  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [licensePlate, setLicensePlate] = useState<string>('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [showImageOptions, setShowImageOptions] = useState<boolean>(false);

  const defaultImageUri = require('../../../assets/default-image.jpg');

  useEffect(() => {
    if (vehicle) {
      setMake(vehicle.make || '');
      setModel(vehicle.model || '');
      setYear(vehicle.year ? vehicle.year.toString() : '');
      setLicensePlate(vehicle.licensePlate || '');
      setPhoto(vehicle.photo || null);
    }
  }, [vehicle]);

  const validateInputs = () => {
    if (year && isNaN(Number(year))) {
      Alert.alert('Validation Error', 'Please enter a valid year.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    const formData = new FormData();

    // Only append fields if they have changed
    if (make) formData.append('make', make);
    if (model) formData.append('model', model);
    if (year) formData.append('year', year);
    if (licensePlate) formData.append('licensePlate', licensePlate);

    // Add photo if it's changed
    if (photo) {
      const photoData = {
        uri: photo,
        type: 'image/jpeg',
        name: 'vehicle-image.jpg',
      };
      formData.append('file', photoData);
    }

    console.log('Form Data:', formData);

    // Call the updateVehicle function from the hook
    try {
      await updateVehicle(formData, vehicleId);
      console.log('Submit successful');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (fetchError) {
    return <Text>Error: {fetchError}</Text>;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.containerImage}>
          <Pressable onPress={() => setShowImageOptions(!showImageOptions)}>
            <Image
              source={photo ? { uri: photo } : defaultImageUri}
              style={styles.image}
            />
          </Pressable>
          {showImageOptions && (
            <View style={styles.imageOptionsContainer}>
              <Pressable
                onPress={() => checkOrRequestCameraPermission(setPhoto)}
              >
                <Icon name="camera" style={styles.icon} />
              </Pressable>
              <Pressable
                onPress={() => checkOrRequestGalleryPermissions(setPhoto)}
              >
                <Icon name="image" style={styles.icon} />
              </Pressable>
            </View>
          )}
        </View>

        {make !== undefined && (
          <TextInput
            style={styles.input}
            placeholder="Make"
            value={make}
            onChangeText={setMake}
          />
        )}
        {model !== undefined && (
          <TextInput
            style={styles.input}
            placeholder="Model"
            value={model}
            onChangeText={setModel}
          />
        )}
        {year !== undefined && (
          <TextInput
            style={styles.input}
            placeholder="Year"
            value={year}
            onChangeText={setYear}
            keyboardType="numeric"
          />
        )}
        {licensePlate !== undefined && (
          <TextInput
            style={styles.input}
            placeholder="License Plate"
            value={licensePlate}
            onChangeText={setLicensePlate}
          />
        )}

        <Pressable
          style={[styles.button, updateLoading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={updateLoading}
        >
          <Text style={styles.buttonText}>
            {updateLoading ? 'Updating...' : 'Update Vehicle'}
          </Text>
        </Pressable>

        {updateError && <Text style={styles.errorText}>{updateError}</Text>}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UpdateForm;
