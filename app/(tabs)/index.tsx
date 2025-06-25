import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import GalleryImage from '@/components/GalleryImage';
import { homeFeed } from '@/placeholder';

export default function Home() {
  return (
    <View style={styles.container}>
      <FlashList
        data={homeFeed}
        renderItem={({ item }) => (
          <GalleryImage
            url={item.image}
            caption={item.caption}
            id={item.id}
            createdBy={item.createdBy}
          />
        )}
        estimatedItemSize={100}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

