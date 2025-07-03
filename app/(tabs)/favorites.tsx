import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@/components/AuthProvider';
import ImageFeed, { LoadingStates } from '@/components/ImageFeed';
import firestore from '@/lib/firestore';
import { useCallback } from 'react';
import { DocumentSnapshot } from 'firebase/firestore';

export default function Favorites() {
  const { user } = useAuth();
  const fetchFavorites = useCallback(async (loadState: LoadingStates = 'initial', lastVisible: DocumentSnapshot | null) => {
    return firestore.getPosts({
      after: loadState === 'refreshing' ? null : lastVisible,
      onlyFavorites: true,
      userId: user?.uid
    });
  }, []);

  return (
    <ImageFeed fetchPosts={fetchFavorites} />
  );
}
