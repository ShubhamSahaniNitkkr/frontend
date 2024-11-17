import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAuthStore} from '@state/authStore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header: FC<{showNotice: () => void}> = ({showNotice}) => {
  const {setUser, user} = useAuthStore();
  return (
    <View style={styles.subContainer}>
      <TouchableOpacity activeOpacity={0.8}>
        <CustomText fontFamily={Fonts.Bold} variant="h8" style={styles.text}>
          Delivery in
        </CustomText>
        <View style={styles.flexRowGap}>
          <CustomText
            fontFamily={Fonts.SemiBold}
            variant="h2"
            style={styles.text}>
            10 minutes
          </CustomText>
          <TouchableOpacity style={styles.noticeBtn} onPress={showNotice}>
            <CustomText
              fontFamily={Fonts.SemiBold}
              fontSize={RFValue(15)}
              variant="h8"
              style={{color: '#3B4866'}}>
              Rain
            </CustomText>
          </TouchableOpacity>
        </View>
        <View style={styles.flexRow}>
          <CustomText variant="h5" numberOfLines={1} fontFamily={Fonts.Medium}>
            {user?.address || 'Address not available'}
          </CustomText>
          <Icon
            name="menu-down"
            color="#fff"
            size={RFValue(20)}
            style={{bottom: 'auto'}}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="account-circle-outline" size={RFValue(36)} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'android' ? 10 : 5,
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    width: '70%',
  },
  flexRowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  noticeBtn: {
    backgroundColor: '#E8EAF5',
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    bottom: -2,
  },
});

export default Header;
