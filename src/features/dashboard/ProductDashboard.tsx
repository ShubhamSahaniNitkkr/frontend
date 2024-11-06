import {View, Text, Animated as RAnimated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import NoticeAnimation from './NoticeAnimation';
import {NoticeHeight} from '@utils/Scaling';
import {SafeAreaView} from 'react-native-safe-area-context';
import Visuals from './Visuals';

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const ProductDashboard = () => {
  const noticePosition = useRef(new RAnimated.Value(NOTICE_HEIGHT)).current;

  const slideUp = () => {
    RAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT + 12,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    RAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    slideDown();
    const timeoutId = setTimeout(() => {
      slideUp();
    }, 4500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />
        <SafeAreaView>
          <Text>ProductDashboard</Text>
        </SafeAreaView>
      </>
    </NoticeAnimation>
  );
};

export default ProductDashboard;
