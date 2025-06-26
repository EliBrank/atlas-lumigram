import { View, Image, StyleSheet } from 'react-native';

type ImagePreviewProps = {
  imageUrl?: string;
}

export function ImagePreview({ imageUrl }: ImagePreviewProps) {
  const url = imageUrl ? imageUrl : '/assets/images/placeholder.png';
  return (
    <Image
      source={{ uri: url }}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: '90%',
    aspectRatio: 1,
    borderRadius: 20,
  },
});

