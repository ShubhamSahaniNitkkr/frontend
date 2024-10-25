import {Colors, Fonts} from '@utils/Constants';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from './CustomText';

interface Props {
  onPress: () => void;
  title: string;
  disabled: boolean;
  loading: boolean;
}

const CustomButton: React.FC<Props> = ({
  onPress,
  title,
  disabled = false,
  loading,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.btn,
        {backgroundColor: disabled ? Colors.disabled : Colors.secondary},
      ]}
      onPress={onPress}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <CustomText
          variant="h4"
          style={styles.text}
          fontFamily={Fonts.SemiBold}>
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    marginVertical: 15,
    width: '100%',
  },
  text: {
    color: '#fff',
  },
});

export default CustomButton;
