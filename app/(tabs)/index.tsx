import { StyleSheet, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import StripImage from '@/components/StripImage';
import { homeFeed } from '@/placeholder';
import { Post } from '@/lib/firestore'
import { useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

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

