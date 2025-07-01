import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { createContext, ReactNode, useContext } from 'react';
import { auth } from '@/firebaseConfig';

const AuthContext = createContext({ register, logout, login });

type AuthContextProps = {
  register: (email: string, password: string) => Promise<UserCredential>;
  logout: () => void;
  login: (email: string, password: string) => Promise<UserCredential>;
}

export const useAuth = (): AuthContextProps => useContext(AuthContext);

function register(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

function logout() {
  auth.signOut();
}

function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider value={{ register, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}

