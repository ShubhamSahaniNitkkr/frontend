import axios from 'axios';
import {BASE_URL} from './config';
import {tokenStorage} from '@state/storage';
import {useAuthStore} from '@state/authStore';
import {resetAndNavigate} from '@utils/NavigationUtils';
import {appAxios} from './apiInterceptors';

export const customerLogin = async (phone: string) => {
  let data = JSON.stringify({phone});

  let config = {
    method: 'post',
    url: `${BASE_URL}/customer/login`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  try {
    const resp = await axios.request(config);
    console.log(resp, 'resp');
    const {accessToken, refreshToken, customer} = resp.data;
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', refreshToken);
    const {setUser} = useAuthStore.getState();
    setUser(customer);
  } catch (error) {
    console.log('Login error:', error);
    throw error;
  }
};

export const deliveryLogin = async (email: string, password: string) => {
  let data = JSON.stringify({email, password});

  let config = {
    method: 'post',
    url: `${BASE_URL}/delivery/login`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  try {
    const resp = await axios.request(config);
    console.log(resp, 'resp');
    const {accessToken, refreshToken, deliveryPartner} = resp.data;
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', refreshToken);
    const {setUser} = useAuthStore.getState();
    setUser(deliveryPartner);
  } catch (error) {
    console.log('Login error:', error);
    throw error;
  }
};

export const refetchUserFn = async (setUser: any) => {
  try {
    const response = await appAxios.get(`/user`);
    setUser(response.data.user);
  } catch (error) {
    console.log('Error Refreshing User', error);
  }
};

export const refreshTokenFn = async () => {
  try {
    const refreshToken = tokenStorage.getString('refreshToken');
    const resp = await axios.post(`${BASE_URL}/refresh-token`, {refreshToken});
    const newAccessToken = resp.data.accessToken;
    const newRefreshToken = resp.data.refreshToken;

    tokenStorage.set('accessToken', newAccessToken);
    tokenStorage.set('refreshToken', newRefreshToken);

    return newAccessToken;
  } catch (error) {
    console.log('Error Refreshing Token', error);
    tokenStorage.clearAll();
    resetAndNavigate('CustomerLogin');
  }
};
