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
    }
    return json;
  } else {
    console.log("No user");
    return Promise.reject("No user registered in localStorage");
  }
};

const validateToken = (token: string) => {
  console.log("[JWT] Validating token");
  if (token) {
    const decoded: JwtPayload = jwtDecode(token);
    const exp = decoded.exp;
    if (exp) {
      if (exp - Date.now() / 1000 < 30) {
        // 30 second before exp of access token
        console.log("[JWT] New access token needed, updating...");
        updateToken();
      } else if (exp - Date.now() / 1000 < 1800) {
        console.log("[JWT] Token is fine");
      } else {
        console.log("[JWT] New refresh token needed");
      }
    } else {
      console.log("[JWT] Token doesn't have an exp fied", decoded);
    }
  } else {
    console.log("[JWT] No token to test");
  }
};

export const userService = {
  login,
  logout,
  validateToken,
  getAllUsers,
  updateToken
};
