import { db } from "@/firebaseConfig";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  Query,
  query,
  setDoc,
  startAfter
} from "firebase/firestore";

type NewPost = {
  caption: string;
  image: string;
  createdAt: Date;
  createdBy: string;
}

export type Post = NewPost & {
  id: string;
}

const postsCollection = collection(db, 'posts');

async function addPost(post: NewPost) {
  await addDoc(postsCollection, post);
}

type getPostsOptions = {
  limitCount?: number;
  after?: DocumentSnapshot | null;
  onlyFavorites?: boolean;
  userId?: string;
}

type returnedPostsProps = {
  posts: Post[];
  lastVisible: DocumentSnapshot | null;
  hasMore: boolean;
}

async function getPosts(options: getPostsOptions = {}): Promise<returnedPostsProps> {
  const { limitCount = 10, after = null, onlyFavorites = false, userId } = options;

  let favoriteIds: string[] = [];
  if (onlyFavorites && userId) {
    favoriteIds = await getFavorites(userId);
    if (favoriteIds.length === 0) {
      return { posts: [], lastVisible: null, hasMore: false }
    }
  }

  // main query
  let q: Query = query(
    postsCollection,
    orderBy('createdAt', 'desc'),
    limit(limitCount + 1)
  );

  if (after) {
    q = query(q, startAfter(after));
  }

  const querySnapshot = await getDocs(q);
  let posts = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Post));

  if (onlyFavorites) {
    posts = posts.filter(post => favoriteIds.includes(post.id));
  }

  const hasMore = posts.length > limitCount;
  const finalPosts = posts.slice(0, limitCount);
  const lastVisible = querySnapshot.docs[Math.min(querySnapshot.docs.length - 1, limitCount - 1)] || null;

  return {
    posts: finalPosts,
    lastVisible,
    hasMore
  }
}

// Favorite functionality
async function addFavorite(userId: string, postId: string) {
  const userRef = doc(db, 'users', userId);
  const favoritesRef = collection(userRef, 'favorites');

  const favDoc = await getDoc(doc(favoritesRef, 'posts'))
  if (!favDoc.exists()) {
    await setDoc(doc(favoritesRef, 'posts'), {
      postIds: arrayUnion(postId)
    });
  } else {
    await setDoc(doc(favoritesRef, 'posts'), {
      postIds: arrayUnion(postId)
    }, { merge: true });
  }
}

async function getFavorites(userId: string): Promise<string[]> {
  const userRef = doc(db, 'users', userId);
  const favoritesRef = collection(userRef, 'favorites');
  const docSnap = await getDoc(doc(favoritesRef, 'posts'));

  if (docSnap.exists()) {
    return docSnap.data().postIds || [];
  }
  return [];
}

export default {
  addPost,
  getPosts,
  addFavorite,
  getFavorites,
}
