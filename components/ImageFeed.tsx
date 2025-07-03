import { StyleSheet, Text, View, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import StripImage from '@/components/StripImage';
// import { homeFeed } from '@/placeholder';
import firestore, { Post } from '@/lib/firestore'
import { useCallback, useEffect, useState } from 'react';
import { DocumentSnapshot } from 'firebase/firestore';

export type LoadingStates = 'initial' | 'more' | 'refreshing' | false;

type FetchPostsFunction = (
  loadState: LoadingStates,
  lastVisible: DocumentSnapshot | null
) => Promise<{
  posts: Post[];
  lastVisible: DocumentSnapshot | null;
  hasMore: boolean;
}>;
type ImageFeedProps = {
  fetchPosts: FetchPostsFunction;
  initialLoad?: boolean;
}

export default function ImageFeed({ fetchPosts, initialLoad = true }: ImageFeedProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<LoadingStates>(false);
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const handleFetch = useCallback(async (loadState: LoadingStates = 'initial') => {
    if (loading && loadState !== 'refreshing') return;

    try {
      setLoading(loadState);

      const { posts: newPosts, lastVisible: newLastVisible, hasMore: moreAvailable } =
        await fetchPosts(loadState, lastVisible);

      setPosts(prev => loadState === 'refreshing' ? newPosts : [...prev, ...newPosts]);
      setLastVisible(newLastVisible);
      // assume there are more posts if next batch still reaches cut-off for page size
      setHasMore(moreAvailable);
    } catch (error) {
      console.error('Error fetching posts:', error);
      alert('Could not fetch posts');
    } finally {
      setLoading(false);
    }
  }, [fetchPosts, lastVisible]);

  // first load
  useEffect(() => {
    if (initialLoad) {
      handleFetch('initial');
    }
  }, [handleFetch, initialLoad]);

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
        onEndReached={() => !loading && hasMore && handleFetch('more')}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={loading === 'refreshing'}
            onRefresh={() => handleFetch('refreshing')}
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

