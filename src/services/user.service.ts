import { User } from "../entities";
import settings from "../settings";
import jwtDecode, { JwtPayload } from "jwt-decode";

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
  localStorage.removeItem("user");
};

const login = async (username: string, password: string): Promise<Response> => {
  const response = await fetch(settings.LOGIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  const json = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      logout();
    }
    const error = (json && json.message) || response.statusText;
    return Promise.reject(error);
  }

  const user = json;
  if (user.access) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  return user;
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

const valdateToken = (token: string) => {
  if (token) {
    const decoded: JwtPayload = jwtDecode(token);
    const exp = decoded.exp;
    const origIat = decoded.iat;
    if (exp && origIat) {
      if (
        exp - Date.now() / 1000 < 1800 &&
        Date.now() / 1000 - origIat < 628200
      ) {
        console.log("New access token needed, refreshing...");
      } else if (exp - Date.now() / 1000 < 1800) {
        console.log("Token is fine");
      } else {
        console.log("New refresh token needed");
      }
    }
  } else {
    console.log("No token to test");
  }
};

export const userService = {
  login,
  logout,
  valdateToken,
  getAllUsers
};
