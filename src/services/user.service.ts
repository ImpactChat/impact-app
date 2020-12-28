import firebase from "firebase";

const logout = async (): Promise<void> => {
  await firebase.auth().signOut();
};
const login = async (username: string, password: string): Promise<object> => {
  try {
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(username, password);
    return res;
  } catch (err) {
    return Promise.reject(err);
  }
};
const loginMS = async (): Promise<object> => {
  try {
    const provider = new firebase.auth.OAuthProvider("microsoft.com");
    const res = await firebase.auth().signInWithPopup(provider);
    return res;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
const loginApple = async (): Promise<object> => {
  try {
    const provider = new firebase.auth.OAuthProvider("apple.com");
    const res = await firebase.auth().signInWithPopup(provider);
    return res;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

export const userService = {
  login,
  loginMS,
  loginApple,
  logout
};
