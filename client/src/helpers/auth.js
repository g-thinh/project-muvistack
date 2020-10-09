import { auth } from "../services/firebase";

//These functions will handle the sign-in and sign-up process of the app
// for just email/password accounts

export const signup = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const signin = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const signout = () => {
  return auth().signOut();
};

export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}

export function signInWithGitHub() {
  const provider = new auth.GithubAuthProvider();
  return auth().signInWithPopup(provider);
}
