import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
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
import {Colors, Fonts, lightColors} from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import CustomButton from '@components/ui/CustomButton';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import {customerLogin} from '@service/authService';

const gradientColors = [...lightColors].reverse();

const CustomerLogin = () => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFocused ? -200 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [isFocused]);

  const handleGesture = ({nativeEvent}: any) => {
    if (nativeEvent.state === State.END) {
      const {translationX, translationY} = nativeEvent;
      let direction = '';
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        direction = translationY > 0 ? 'down' : 'up';
      }

      const newSequence = [...gestureSequence, direction].slice(-5);
      setGestureSequence(newSequence);
      if (newSequence.join(' ') === 'up up down') {
        setGestureSequence([]);
        resetAndNavigate('DeliveryLogin');
      }
    }
  };

  const handleLoginAPI = async () => {
    setLoading(true);
    try {
      await customerLogin(phone);
      resetAndNavigate('ProductDashboard');
    } catch (error) {
      Alert.alert(
        'Login Failed',
        'Please check your phone number and try again.',
      );
    } finally {
      setLoading(false);
    }
  };

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
              <LinearGradient colors={gradientColors} style={styles.gradient} />
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
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
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
        <View style={styles.footer}>
          <SafeAreaView>
            <CustomText fontSize={RFValue(10)}>
              By continue , you are agree to our terms & conditions
            </CustomText>
          </SafeAreaView>
        </View>
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
    marginBottom: 10,
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
    paddingBottom: 30,
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 20,
    marginVertical: 20,
  },
  footer: {
    borderTopWidth: 0.8,
    borderColor: Colors.border,
    paddingBottom: 10,
    zIndex: 22,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'whitesmoke',
    width: '100%',
  },
  gradient: {
    paddingTop: 160,
    width: '100%',
  },
});

export default CustomerLogin;
