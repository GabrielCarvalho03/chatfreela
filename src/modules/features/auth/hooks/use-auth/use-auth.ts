import { create } from "zustand";
import { useAuthProps, User } from "./types";
import { api } from "@/modules/services/api.service";
import { toast } from "react-toastify";

export const useAuth = create<useAuthProps>(() => ({
  user: {} as User,
  handleLogin: async (data, navigate) => {
    try {
      const res = await api.post("/login", {
        email: data.email,
        password: data.password,
      });
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 3000,
      });
      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (error) {
      console.log("Login error:", error);

      toast.error(
        "Erro ao fazer login. Verifique suas credenciais e tente novamente.",
        {
          position: "top-right",
          autoClose: 3000,
        },
      );
    }
  },
  handleRegister: async (data, navigate) => {
    try {
      console.log("Register data:", data);
      const res = await api.post("/register", {
        countryCode: data.countryCode,
        email: data.email,
        fullName: data.fullName,
        password: data.password,
        phone: data.phone,
      });
      console.log("Register successful:", res.data);
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 3000,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log("Register error:", error);
    }
  },
  handleGetUser: async (userId) => {
    try {
      console.log("Getting user with ID:", userId);
      const res = await api.get(`/users/${userId}`);
      return res.data;
    } catch (error) {
      console.log("Get user error:", error);
    }
  },

  handleLogout: (navigate) => {
    localStorage.removeItem("token");
    navigate("/");
  },
}));
