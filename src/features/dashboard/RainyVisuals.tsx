import {View, Text, StyleSheet, Image} from 'react-native';
import React, {FC} from 'react';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

import {darkWeatherColors} from '@utils/Constants';
import {screenHeight, screenWidth} from '@utils/Scaling';
import LottieView from 'lottie-react-native';

const RainyVisuals: FC = () => {
  return (
    <Animated.View style={styles.container}>
      <LinearGradient colors={darkWeatherColors} style={styles.gradient} />
      <Image
        source={require('@assets/images/cloud.png')}
        style={styles.cloud}
      />
      <LottieView
        autoPlay={true}
        enableMergePathsAndroidForKitKatAndAbove={true}
        loop={true}
        style={styles.lottie}
        source={require('@assets/animations/raining.json')}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  lottie: {
    width: '100%',
    height: 150,
    position: 'absolute',
    transform: [{scaleX: -1}],
  },
  gradient: {
    width: '100%',
    height: screenHeight * 0.4,
    position: 'absolute',
  },
  cloud: {
    width: screenWidth,
    height: 70,
    resizeMode: 'stretch',
  },
});

export default RainyVisuals;
