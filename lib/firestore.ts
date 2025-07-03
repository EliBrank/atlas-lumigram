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

type returnedPostsProps = {
  posts: Post[];
  lastVisible: DocumentSnapshot | null;
}

async function getPosts(
  options: {
    limitCount?: number;
    after?: DocumentSnapshot | null;
  } = {}
): Promise<returnedPostsProps> {
  const { limitCount = 10, after = null } = options;

  // main query
  let q: Query = query(
    postsCollection,
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  );

  if (after) {
    q = query(q, startAfter(after));
  }

  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Post));

  return {
    posts,
    lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1] || null
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
