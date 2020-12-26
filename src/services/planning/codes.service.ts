import axios from "axios";
import settings from "../../settings";
import { Code } from "../../entities";
import store from "../../store";
import firebase from "firebase";

const getCodes = async (): Promise<Array<Code>> => {
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

const submitCodes = async (data: Code): Promise<object> => {
  if (store.state.auth.user === undefined) {
    return Promise.reject("User doesn't exist in store");
  }
  const token = await firebase.auth().currentUser?.getIdToken();
  try {
    const res = await axios.post(settings.CODES_ENDPOINT, data, {
      headers: {
        AUTHORIZATION: "Bearer " + token
      }
    });
    console.log(res.statusText);
    return Promise.resolve(res.data);
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);

    return Promise.reject(error);
  }
};

export const codeService = {
  getCodes,
  submitCodes
};
