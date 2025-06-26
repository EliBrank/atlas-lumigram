import { StyleSheet, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import StripImage from '@/components/StripImage';
import { homeFeed } from '@/placeholder';

export default function Home() {
  // useEffect to bring in images from db?

  return (
    <View style={styles.container}>
      <FlashList
        data={homeFeed}
        renderItem={({ item }) => (
          <StripImage
            url={item.image}
            caption={item.caption}
            id={item.id}
            createdBy={item.createdBy}
            imageStyle={{ marginBottom: 16 }}
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

