import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  UserCredential
} from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { auth, db } from '@/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const AuthContext = createContext<AuthContextProps>({ register, logout, login });

type AuthContextProps = {
  register: (email: string, password: string) => Promise<UserCredential>;
  logout: () => void;
  login: (email: string, password: string) => Promise<UserCredential>;
  user?: User | null;
}

export const useAuth = (): AuthContextProps => useContext(AuthContext);

function register(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // also add user document in firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: userCredential.user.email,
        createdAt: new Date()
      });
      return userCredential;
    });
}

function logout() {
  auth.signOut();
}

function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [])

  return (
    <AuthContext.Provider value={{ user, register, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}

