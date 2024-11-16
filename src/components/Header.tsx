import React from 'react';
import {Text, View, Image, Button} from 'react-native';
import stylesHeader from './Header.styles';
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationLogin = NativeStackNavigationProp<RootStackParamList, 'login'>;

const Header: React.FC<NavigationLogin> = () => {
  const navigation = useNavigation<NavigationLogin>();
  const handlePress = async () => {
    await AsyncStorage.removeItem('accessToken');
    navigation.navigate('login');
  };
  return (
    <View style={stylesHeader.container}>
      <Text style={stylesHeader.text}>vehicleMaintenance</Text>
      <Image
        source={require('../assets/main-icon.png')}
        style={stylesHeader.image}
        resizeMode="cover"
      />
      <Button title="Logout" onPress={handlePress} />
    </View>
  );
};

export default Header;
