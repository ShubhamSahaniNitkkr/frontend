import {View, Text, StyleSheet, Animated as RAnimated} from 'react-native';
import React, {FC} from 'react';
import {NoticeHeight} from '@utils/Scaling';
import Notice from '@components/dashboard/Notice';

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const NoticeAnimation: FC<{
  noticePosition: any;
  children: React.ReactElement;
}> = ({noticePosition, children}) => {
  return (
    <View style={styles.container}>
      <RAnimated.View
        style={[
          styles.noticeContainer,
          {transform: [{translateY: noticePosition}]},
        ]}>
        <Notice />
      </RAnimated.View>

      <RAnimated.View
        style={[
          styles.contentContainer,
          {
            paddingTop: noticePosition.interpolate({
              inputRange: [NOTICE_HEIGHT, 0],
              outputRange: [0, NOTICE_HEIGHT + 20],
            }),
          },
        ]}>
        {children}
      </RAnimated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  noticeContainer: {
    width: '100%',
    zIndex: 9999,
    position: 'absolute',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default NoticeAnimation;