import { StyleSheet, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import StripImage from '@/components/StripImage';
// import { homeFeed } from '@/placeholder';
import firestore, { Post } from '@/lib/firestore'
import { useCallback, useEffect, useState } from 'react';
import { DocumentSnapshot } from 'firebase/firestore';
import { RefreshControl } from 'react-native';

const PAGE_SIZE = 2;

export default function Home() {
  type LoadingStates =
    | 'initial'
    | 'more'
    | 'refreshing'
    | false;

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<LoadingStates>(false);
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async (loadState: LoadingStates = 'initial') => {
    try {
      setLoading(loadState);

      const { posts: newPosts, lastVisible: newLastVisible } =
        await firestore.getPosts({
          limitCount: PAGE_SIZE,
          after: loadState === 'refreshing' ? null : lastVisible
        });

      setPosts(prev => loadState === 'refreshing' ? newPosts : [...prev, ...newPosts]);
      setLastVisible(newLastVisible);
      // assume there are more posts if next batch still reaches cut-off for page size
      setHasMore(newPosts.length === PAGE_SIZE);
    } catch (error) {
      console.error('Error fetching posts:', error);
      alert('Could not fetch posts');
    } finally {
      setLoading(false);
    }
  }, [lastVisible]);

  // first load
  useEffect(() => {
    fetchPosts('initial');
  }, []);

  return (
    <View style={styles.container}>
      <FlashList
        data={posts}
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
        onEndReached={() => !loading && hasMore && fetchPosts('more')}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={loading === 'refreshing'}
            onRefresh={() => fetchPosts('refreshing')}
          />
        }
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

