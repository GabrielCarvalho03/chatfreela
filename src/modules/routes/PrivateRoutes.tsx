/* eslint-disable @typescript-eslint/no-explicit-any */

import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/modules/services/api.service";
import { useAuth } from "../features/auth/hooks/use-auth/use-auth";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

export function PrivateRoutes() {
  const { user, handleGetUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    validateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const messageInvalidToken = () => {
    toast.error(
      <div>
        <div className="font-semibold">Não foi possível continuar</div>
        <div className="text-sm text-gray-600">
          Sessão expirada. Por favor, faça login novamente.
        </div>
      </div>,
    );
  };

  const validateToken = async () => {
    try {
      const userToken = localStorage.getItem("token");

      // Se não tem token, não está autenticado
      if (!userToken) {
        setIsAuthenticated(false);
        setLoading(false);

        messageInvalidToken();
        return;
      }

      try {
        // Validar token no backend
        const res = await api.post("auth/validate", {
          token: userToken,
        });
        if (res.data.data.isValid) {
          await handleGetUser(res.data.data.userId ?? "");
          // Token válido
          setIsAuthenticated(true);
        } else {
          // Token inválido - remover do localStorage
          localStorage.removeItem("token");
          localStorage.removeItem("user"); // se você armazena dados do usuário

          setIsAuthenticated(false);
        }
      } catch (error: any) {
        console.error("Erro ao validar token:", error);
        // Em caso de erro de rede, remover token por segurança
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        messageInvalidToken();
        return;
      }
    } catch (error) {
      console.error("Erro ao validar token:", error);
      // Em caso de erro de rede, remover token por segurança
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      messageInvalidToken();
    } finally {
      setLoading(false);
    }
  };

  // Loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 width={20} className="animate-spin rounded-full h-12 w-10  " />
      </div>
    );
  }

  // Se autenticado, renderiza as rotas privadas
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
