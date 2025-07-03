import { db } from "@/firebaseConfig";
import {
  addDoc,
  collection,
  DocumentSnapshot,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  Query,
  query,
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

export default {
  addPost,
  getPosts,
}
