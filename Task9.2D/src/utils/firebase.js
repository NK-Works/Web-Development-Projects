/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 21/09/2023                      */

// Import the functions needed
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { getStorage } from "firebase/storage";
import bcrypt from 'bcryptjs';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBySFZzwIEiCs9wj95WMq9XpV6iEgvuN8",
  authDomain: "questionarticleapp.firebaseapp.com",
  projectId: "questionarticleapp",
  storageBucket: "questionarticleapp.appspot.com",
  messagingSenderId: "828662411966",
  appId: "1:828662411966:web:f49eea74cfa56f7abee4ef"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Create a new instance of GoogleAuthProvider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

// Export the authentication instance and Firestore database in
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Function to create a user document in Firestore for Google authentication
export const createuserdocfromAuthforGoogle = async (userAuth, additionalInformation = {}) => {
  if (!userAuth.email) return;

  const userDocRef = doc(db, 'user_data', userAuth.uid);
  console.log(userDocRef)

  const userSnapShots = await getDoc(userDocRef);
  console.log(userSnapShots)
  console.log(userSnapShots.exists())

  if (!userSnapShots.exists()) {
    const { email } = userAuth
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName: 'Google Login',
        email,
        createdAt,
        subscriptionStatus: 'free',
        ...additionalInformation
      })
    }
    catch (error) {
      console.log('error in creating', error.message)
    }
  }
  return userDocRef;
}

// Function to create a user document in Firestore for email/password authentication
export const createuserdocfromAuthforMail = async (userAuth, userName, additionalInformation = {}) => {
  if (!userAuth || !userAuth.email) return;

  const userDocRef = doc(db, 'user_data', userAuth.uid);
  console.log(userDocRef);

  const userSnapshots = await getDoc(userDocRef);
  console.log(userSnapshots);
  console.log(userSnapshots.exists());

  if (!userSnapshots.exists()) {
    const { email } = userAuth;
    const displayName = userName;
    const { password } = additionalInformation;
    const createdAt = new Date();

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    console.log('User Name: ', displayName);
    console.log('Password: ', hashedPassword);

    try {
      await setDoc(userDocRef, {
        displayName: displayName || '', // Check if displayName exists or provide a default value
        email,
        createdAt,
        subscriptionStatus: 'free',
        hashedPassword,
        // ...additionalInformation   // Uncomment to see the actual password stored
      });
    } catch (error) {
      console.log('error in creating', error.message);
    }
  }
  return userDocRef;
};

// Function to create a user account with email and password
export async function createAuthUserWithEmailAndPassword(email, password) {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
}

// Function to sign in a user with email and password
export async function signinAuthUserWithEmailAndPassword(email, password) {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password)
}