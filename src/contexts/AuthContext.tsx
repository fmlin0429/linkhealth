'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, firestore } from '@/lib/firebase';
import { AuthContextType, UserProfile } from '@/types/user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const createUserProfile = async (firebaseUser: User): Promise<UserProfile> => {
    const userProfile: UserProfile = {
      uid: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      createdAt: new Date(),
      lastLoginAt: new Date(),
    };

    // Save to Firestore
    const userDocRef = doc(firestore, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // New user - create profile
      await setDoc(userDocRef, {
        ...userProfile,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      });
    } else {
      // Existing user - update last login
      await setDoc(userDocRef, {
        lastLoginAt: serverTimestamp(),
      }, { merge: true });
      
      // Get existing data
      const existingData = userDoc.data();
      userProfile.createdAt = existingData.createdAt?.toDate() || new Date();
      userProfile.preferences = existingData.preferences;
    }

    return userProfile;
  };

  const signInWithGoogle = async () => {
    try {
      setError(null);
      setLoading(true);
      console.log('Attempting Google sign in...');
      console.log('Auth object:', auth);
      console.log('Google provider:', googleProvider);
      console.log('Firebase config check:', {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.slice(0, 10) + '...',
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID?.slice(0, 20) + '...'
      });
      
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Sign in result:', result);
      
      const userProfile = await createUserProfile(result.user);
      setUser(userProfile);
      console.log('User profile created:', userProfile);
    } catch (error: any) {
      console.error('Detailed error signing in with Google:', error);
      console.error('Error code:', error?.code);
      console.error('Error message:', error?.message);
      setError(`Failed to sign in with Google: ${error?.message || error?.code || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error: any) {
      console.error('Error signing out:', error);
      setError('Failed to sign out. Please try again.');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userProfile = await createUserProfile(firebaseUser);
          setUser(userProfile);
        } catch (error: any) {
          console.error('Error creating user profile:', error);
          setError('Failed to load user profile.');
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    signInWithGoogle,
    signOut,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};