import {View, Text} from 'react-native';
import React from 'react';
import {useAuthStore} from '@state/authStore';

const ProductDashboard = () => {
  const {user} = useAuthStore();
  return (
    <View>
      <Text>ProductDashboard</Text>
    </View>
  );
};

export default ProductDashboard;