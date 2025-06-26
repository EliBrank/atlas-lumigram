import { View, Image, StyleSheet, Text } from 'react-native';
import placeholder from '@/assets/images/placeholder.png';

type ImagePreviewProps = {
  imageUrl?: string;
};

export function ImagePreview({ imageUrl }: ImagePreviewProps) {
  return (
    <View style={styles.container}>
      {!imageUrl && (
        <Image
          source={placeholder}
          style={styles.placeholderImage}
        />
      )}
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
    aspectRatio: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  placeholderImage: {
    maxWidth: '100%',
    resizeMode: 'contain',
  }
});

