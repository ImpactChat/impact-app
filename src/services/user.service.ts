import { User } from "../entities";
import settings from "../settings";
import jwtDecode, { JwtPayload } from "jwt-decode";
import firebase from "firebase";

const authHeader = (): { Authorization: string } | {} => {
  const storaged = localStorage.getItem("user");
  if (!storaged) {
    return {};
  }
  const user = JSON.parse(storaged);
  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
};

const logout = (): void => {
  firebase.auth().signOut();
};
const login = async (username: string, password: string): Promise<object> => {
  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(username, password);
    return res;
  } catch (err) {
    return Promise.reject(err);
  }
};

const getAllUsers = async (): Promise<User[]> => {
  const response = await fetch(`${process.env.VUE_APP_API_URL}/users`, {
    method: "GET",
    headers: authHeader()
  });
  const json = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      logout();
      location.reload(true);
    }
    const error = (json && json.message) || response.statusText;
    return Promise.reject(error);
  }

  return json;
};
const updateToken = async (): Promise<Response> => {
  console.log("[JWT] updateToken method called");
  const user = localStorage.getItem("user");
  if (user) {
    const refresh = JSON.parse(user).refresh;
    const response = await fetch(settings.REFRESH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh })
    });
    const json = await response.json();
    if (!response.ok) {
      if (response.status === 401) {
        console.warn("Refresh token invalid, logging out");
        logout();
      }
      const error = (json && json.message) || response.statusText;
      return Promise.reject(error);
    }

    if (json.access) {
      const newUser = {
        refresh: JSON.parse(user).refresh,
        access: json.access
      };
      localStorage.setItem("user", JSON.stringify(newUser));
      console.info("Successfully refreshed access token");
    }
    return json;
  } else {
    console.log("No user");
    return Promise.reject("No user registered in localStorage");
  }
};

const validateToken = (token: string): boolean => {
  console.log("[JWT] Validating token");
  if (token) {
    const decoded: JwtPayload = jwtDecode(token);
    const exp = decoded.exp;
    if (exp) {
      if (exp - Date.now() / 1000 < 30) {
        // 30 second before exp of access token
        console.info("[JWT] New access token needed, updating...");
        updateToken();
        return true;
      } else if (exp - Date.now() / 1000 < 1800) {
        console.info("[JWT] Token is fine");
        return true;
      } else {
        console.info("[JWT] New refresh token needed");
        return false;
      }
    } else {
      console.info("[JWT] Token doesn't have an exp fied", decoded);
      return false;
    }
  } else {
    console.info("[JWT] No token to test");
    return false;
  }
};

export const userService = {
  login,
  logout,
  validateToken,
  getAllUsers,
  updateToken
};
