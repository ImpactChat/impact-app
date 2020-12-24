import axios from "axios";
import settings from "../../settings";
import { Code } from "../../entities";
import store from "../../store";
import firebase from "firebase";

const getCodes = async (): Promise<Array<Code>> => {
  axios.all([1]);
  if (store.state.auth.user === undefined) {
    return Promise.reject("User doesn't exist in store");
  }
  const token = await firebase.auth().currentUser?.getIdToken();
  const res = await axios.get(settings.CODES_ENDPOINT, {
    headers: {
      AUTHORIZATION: "Bearer " + token
    }
  });
  return Promise.resolve(res.data);
};

export const codeService = {
  getCodes
};
