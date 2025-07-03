import firestore, { Post } from '@/lib/firestore'
import { useCallback, useEffect, useState } from 'react';
import { DocumentSnapshot } from 'firebase/firestore';
import { RefreshControl } from 'react-native';
import ImageFeed, { LoadingStates } from '@/components/ImageFeed';

const PAGE_SIZE = 2;

export default function Home() {
  const fetchPosts = useCallback(async (loadState: LoadingStates = 'initial', lastVisible: DocumentSnapshot | null) => {
    return firestore.getPosts({
      limitCount: PAGE_SIZE,
      after: loadState === 'refreshing' ? null : lastVisible,
      onlyFavorites: false,
    });
  }, []);

  return (
    <ImageFeed fetchPosts={fetchPosts} />
  );
}
