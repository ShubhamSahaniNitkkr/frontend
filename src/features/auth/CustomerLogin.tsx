import {View, Text, StyleSheet, Animated, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import {resetAndNavigate} from '@utils/NavigationUtils';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import CustomButton from '@components/ui/CustomButton';
import useKeyboardOffsetHeight from '@utils/keyboardOffsetHeight';

const CustomerLogin = () => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);

  const keyboardOffsetHeight = useKeyboardOffsetHeight();

  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    console.log(keyboardOffsetHeight, 'keyboardOffsetHeight');
    if (keyboardOffsetHeight == 0) {
      console.log('comine 1');
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      console.log('comine 2');
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.84,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [keyboardOffsetHeight]);

  const handleGesture = ({nativeEvent}: any) => {
    if (nativeEvent.state === State.END) {
      const {translationX, translationY} = nativeEvent;

      let direction = '';
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        direction = translationY > 0 ? 'down' : 'up';
      }
      console.log(translationX, translationY, direction, 'gesture log');

      const newSequence = [...gestureSequence, direction].slice(-5);
      setGestureSequence(newSequence);
      console.log(newSequence, 'newSequence');
      if (newSequence.join(' ') === 'up up down left right') {
        setGestureSequence([]);
        resetAndNavigate('DeliveryLogin');
      }
    }
  };
  const handleLoginAPI = async () => {};

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <CustomSafeAreaView>
          <ProductSlider />
          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <Animated.ScrollView
              bounces={false}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.contentContainer}
              style={{transform: [{translateY: animatedValue}]}}>
              <View style={styles.content}>
                <Image
                  source={require('@assets/images/logo.png')}
                  style={styles.logo}
                />
                <CustomText variant="h2" fontFamily={Fonts.Bold}>
                  India's Fastest Delivery App
                </CustomText>
                <CustomText
                  variant="h5"
                  fontFamily={Fonts.SemiBold}
                  style={styles.text}>
                  Login or Sign up
                </CustomText>

                <CustomInput
                  onChangeText={text => setPhone(text.slice(0, 10))}
                  onClear={() => setPhone('')}
                  placeholder="Enter Phone Number"
                  inputMode="numeric"
                  left={
                    <CustomText
                      variant="h3"
                      fontFamily={Fonts.SemiBold}
                      style={styles.phoneText}>
                      +91
                    </CustomText>
                  }
                  value={phone}
                />
                <CustomButton
                  onPress={() => handleLoginAPI()}
                  loading={loading}
                  disabled={phone === '' || phone?.length !== 10}
                  title="Continue"
                />
              </View>
            </Animated.ScrollView>
          </PanGestureHandler>
        </CustomSafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  phoneText: {
    marginLeft: 10,
    marginBottom: -2,
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 0,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 2,
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 20,
    marginVertical: 20,
  },
});

export default CustomerLogin;
