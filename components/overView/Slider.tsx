import React, {useRef} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {root} from '../../css';

interface schema {
  pictures: string[];
}
export default function Slider({pictures}: schema): JSX.Element {
  const crousalRef = useRef<Carousel<string>>(null);

  const renderPictures = ({
    item,
  }: // index,
  {
    item: string;
    // index: number;
  }): any => {
    return (
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{uri: item}}
          resizeMode={'stretch'}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={crousalRef}
        data={pictures}
        renderItem={renderPictures as any}
        // hasParallaxImages={true}
        layout={'default'}
        layoutCardOffset={12}
        sliderWidth={root.width}
        sliderHeight={root.width}
        itemWidth={root.width}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: root.defaultSpace,
  },
  imageContainer: {
    width: root.width,
    height: Math.floor(root.width * 0.7),
    zIndex: 0,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,

    backgroundColor: root.bgColor1,

    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    // resizeMode: "",
  },
});
