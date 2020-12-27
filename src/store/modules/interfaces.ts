import { User } from "@/entities";
import { Code } from "@/entities";

export interface RootState {
  version: string;
}

export interface AlertState {
  type?: string;
  message?: string;
}

export interface AuthState {
  loggingIn: boolean;
  loggedIn: boolean;
  user?: User;
}

export interface UsersState {
  loading: boolean;
  users: User[];
  error?: Error;
}

export interface CodesState {
  fetching: boolean;
  codes: Array<Code>;
}

export interface PreferencesState {
  dark: boolean;
}
