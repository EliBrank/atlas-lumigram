import { Image, View, StyleSheet } from 'react-native';

type HomeImageProps = {
  url: string;
  caption: string;
  id: string;
  createdBy: string;
}

export default function GalleryImage({ url, caption, id, createdBy }: HomeImageProps) {
  return (
    <Image
      source={{ uri: url }}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 20,
  },
});

