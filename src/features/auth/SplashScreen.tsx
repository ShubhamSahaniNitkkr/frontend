import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import React, {FC, useEffect} from 'react';
import {Colors} from '@utils/Constants';
import {screenHeight, screenWidth} from '@utils/Scaling';
import SplashLogo from '@assets/images/splash_logo.jpeg';
import GeoLocation from '@react-native-community/geolocation';

GeoLocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

const SplashScreen: FC = () => {
  useEffect(() => {
    const fetchUserLocation = () => {
      try {
        GeoLocation.requestAuthorization();
      } catch (error) {
        Alert.alert('Your Location is required for better Shopping experience');
      }
    };
    const id = setTimeout(fetchUserLocation, 1000);

    return () => clearTimeout(id);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={SplashLogo} style={styles.logoImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  logoImage: {
    height: screenHeight,
    width: screenWidth,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
