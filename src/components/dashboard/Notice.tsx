import {View, Text, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {NoticeHeight} from '@utils/Scaling';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import Svg, {Defs, G, Path, Use} from 'react-native-svg';
import {wavyData} from '@utils/dummyData';

const Notice: FC = () => {
  return (
    <View style={{height: NoticeHeight}}>
      <View style={style.container}>
        <View style={style.noticeContainer}>
          <SafeAreaView style={{padding: 10}}>
            <CustomText
              style={style.heading}
              variant="h3"
              fontFamily={Fonts.SemiBold}>
              It's raining outside
            </CustomText>
            <CustomText variant="h7" style={style.textCenter}>
              Delivery may take some time
            </CustomText>
          </SafeAreaView>
        </View>
      </View>
      <Svg
        width="100%"
        height="35"
        fill="#CCD5E4"
        viewBox="0 0 4000 1000"
        preserveAspectRatio="none"
        style={style.wave}>
        <Defs>
          <Path id="wavepath" d={wavyData} />
        </Defs>
        <G>
          <Use href="#wavepath" y="321" />
        </G>
      </Svg>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#CCD5E4',
  },
  noticeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCD5E4',
  },
  heading: {
    color: '#2D3875',
    marginBottom: 0,
    textAlign: 'center',
  },
  textCenter: {
    textAlign: 'center',
    marginBottom: 0,
  },
  wave: {
    width: '100%',
    transform: [{rotateX: '180deg'}],
  },
});

export default Notice;
