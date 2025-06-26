import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { Image, View, StyleSheet, StyleProp, ViewStyle, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
// import Animated, { interpolate } from 'react-native-reanimated';

type StripImageProps = {
  url: string;
  id: string;
  caption?: string;
  createdBy?: string;
  imageStyle?: StyleProp<ViewStyle>;
}

export default function StripImage({
  url,
  id,
  caption,
  createdBy,
  imageStyle
}: StripImageProps) {
  const [showOverlay, setShowOverlay] = useState(false);

  const longPress = Gesture.LongPress()
    .onStart(() => setShowOverlay(true))
    .onEnd(() => setShowOverlay(false))
    .runOnJS(true);

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      // TODO: add favorite functionality
      alert('Favorited!');
    })
    .runOnJS(true);

  return (
    <GestureDetector gesture={Gesture.Exclusive(longPress, doubleTap)}>
      <View style={[styles.container, imageStyle]}>
        <Image
          source={{ uri: url }}
          style={styles.image}
        />
        {showOverlay && (
          <View style={styles.overlay}>
            <Text style={styles.captionText}>{caption}</Text>
          </View>
        )}
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
  },
  captionText: {
    color: Colors.dark.text,
  }
});

