import {
  Settings,
  Grid2X2, // O ícone de grade/dots no topo
  Star, // A estrela
  User, // O ícone de pessoa/usuário
  Triangle,
  LogOut, // O triângulo
} from "lucide-react";
import { BlueCircle } from "@/modules/features/chat/components/blue-circle/blue-circle";
import { useAuth } from "@/modules/features/auth/hooks/use-auth/use-auth";
import { useNavigate } from "react-router";

// Componente da Sidebar
export const Sidebar = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  return (
    <div className="w-16 h-screen bg-white border-r border-gray-200 flex flex-col items-center py-4">
      {/* Círculo azul no topo */}
      <div className="mb-8">
        <BlueCircle size={32} />
      </div>

      {/* Ícones do meio */}
      <div className="flex flex-col gap-2 flex-1">
        <button className="p-3 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
          <Grid2X2 size={18} />
        </button>
        <button className="p-3 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
          <Star size={18} />
        </button>
        <button className="p-3 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
          <User size={18} />
        </button>
        <button className="p-3 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
          <Triangle size={18} />
        </button>
      </div>

      {/* Parte inferior */}
      <div className="flex flex-col gap-4">
        {/* Configurações */}
        <button className="p-3 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
          <Settings size={20} />
        </button>

        {/* Avatar */}
        <div className="w-10 h-10 bg-[#DBEAFE]  rounded-full flex items-center justify-center text-blue-500 font-semibold text-sm">
          SL
        </div>

        <button
          onClick={() => handleLogout(navigate)}
          className="w-10 h-10 cursor-pointer   rounded-full flex items-center justify-center text-red-500 font-semibold text-sm"
        >
          <LogOut width={20} height={20} />
        </button>
      </div>
    </div>
  );
};
