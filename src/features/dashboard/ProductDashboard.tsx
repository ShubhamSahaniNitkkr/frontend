import {View, Text, Animated as RAnimated, StyleSheet} from 'react-native';
import React, {useEffect, useRef} from 'react';
import NoticeAnimation from './NoticeAnimation';
import {NoticeHeight} from '@utils/Scaling';
import {SafeAreaView} from 'react-native-safe-area-context';
import RainyVisuals from './RainyVisuals';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from './AnimatedHeader';

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const ProductDashboard = () => {
  const noticePosition = useRef(new RAnimated.Value(NOTICE_HEIGHT)).current;

  const slideUp = () => {
    RAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
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
        <RainyVisuals />
        <SafeAreaView />
        <CollapsibleContainer style={styles.panelContainer}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <AnimatedHeader
              showNotice={() => {
                slideDown();
                const timeoutId = setTimeout(() => {
                  slideUp();
                }, 3500);
                return () => clearTimeout(timeoutId);
              }}
            />
          </CollapsibleHeaderContainer>
        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
};

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
    position: 'relative',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
});

export default withCollapsibleContext(ProductDashboard);
