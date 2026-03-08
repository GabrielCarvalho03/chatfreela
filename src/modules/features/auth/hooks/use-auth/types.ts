import { NavigateFunction } from "react-router-dom";

export type RegisterForm = {
  countryCode: string;
  email: string;
  fullName: string;
  password: string;
  phone: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
};

export interface useAuthProps {
  user: User;
  handleLogin: (data: LoginForm, navigate: NavigateFunction) => Promise<void>;
  handleRegister: (
    data: RegisterForm,
    navigate: NavigateFunction,
  ) => Promise<void>;
  handleGetUser: (userId: string) => Promise<User | void>;
  handleLogout: (navigate: NavigateFunction) => void;
}
