import {View, Text, Image, StyleSheet} from 'react-native';
import React, {FC, useMemo} from 'react';
import {imageData} from '@utils/dummyData';
import AutoScroll from '@homielab/react-native-auto-scroll';
import {screenHeight, screenWidth} from '@utils/Scaling';

const ProductSlider = () => {
  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < imageData.length; i++) {
      result.push(imageData.slice(i, i + 4));
    }
    return result;
  }, []);

  return (
    <View pointerEvents="none">
      <AutoScroll
        style={styles.autoScroll}
        endPaddingWidth={0}
        duration={10000}>
        <View style={styles.imageContainerParent}>
          {rows.map((row: any, idx: number) => {
            return <MemoizedRow key={idx} row={row} rowIndex={idx} />;
          })}
        </View>
      </AutoScroll>
    </View>
  );
};

const Row: FC<{row: typeof imageData; rowIndex: number}> = ({
  row,
  rowIndex,
}) => {
  return (
    <View style={styles.row}>
      {row.map((image, imageIdx) => {
        const horizontalShift = rowIndex % 2 === 0 ? -18 : 18;
        return (
          <View
            key={imageIdx}
            style={[
              styles.imageContainer,
              {transform: [{translateX: horizontalShift}]},
            ]}>
            <Image key={imageIdx} source={image} style={styles.image} />
          </View>
        );
      })}
    </View>
  );
};

const MemoizedRow = React.memo(Row);

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 12,
    marginHorizontal: 10,
    width: screenWidth * 0.24,
    height: screenHeight * 0.12,
    backgroundColor: 'gainsboro',
    justifyContent: 'center',
    borderRadius: 15,
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  autoScroll: {
    position: 'absolute',
    zIndex: -2,
    // padding: 20,
  },
  imageContainerParent: {
    justifyContent: 'center',
    overflow: 'visible',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export default ProductSlider;
