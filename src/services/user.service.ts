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

export const userService = {
  login,
  logout
};
