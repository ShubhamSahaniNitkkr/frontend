import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import React, {FC, useEffect} from 'react';
import {Colors} from '@utils/Constants';
import {screenHeight, screenWidth} from '@utils/Scaling';
import SplashLogo from '@assets/images/splash_logo.jpeg';
import GeoLocation from '@react-native-community/geolocation';
import {useAuthStore} from '@state/authStore.tsx';
import {tokenStorage} from '@state/storage.tsx';
import {resetAndNavigate} from '@utils/NavigationUtils';
import {jwtDecode} from 'jwt-decode';
import {refreshTokenFn, refetchUserFn} from '@service/authService.tsx';

interface DecodedToken {
  exp: number;
}

GeoLocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

const SplashScreen: FC = () => {
  const {user, setUser} = useAuthStore();

  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString('accessToken') as string;
    const refreshToken = tokenStorage.getString('refreshToken') as string;

    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

      const currenTime = Date.now() / 1000;
      if (decodedRefreshToken?.exp < currenTime) {
        resetAndNavigate('CustomerLogin');
        Alert.alert('Session Expired', 'Please Login Again !');
        return false;
      }

      if (decodedAccessToken?.exp < currenTime) {
        try {
          refreshTokenFn();
          await refetchUserFn(setUser);
        } catch (error) {
          console.log(error);
          Alert.alert('Error while refreshing token');
          return false;
        }
      }

      if (user?.role === 'Customer') {
        resetAndNavigate('ProductDashboard');
      } else {
        resetAndNavigate('DeliveryDashboard');
      }

      return true;
    }

    resetAndNavigate('CustomerLogin');
    return false;
  };

  useEffect(() => {
    const fetchUserLocation = () => {
      try {
        GeoLocation.requestAuthorization();
        tokenCheck();
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
