import { Input } from "@/shared/components/ui/input";
import { ChatHero } from "../components/chat-hero/chat-hero";
import { BlueCircle } from "../components/blue-circle/blue-circle";
import { Send } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Sidebar } from "@/shared/components/sidebar/sidebar";

export const ChatScreen = () => {
  return (
    <div className="w-full min-h-screen bg-white flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col">
        <ChatHero />
        <section className="flex-1 w-full flex flex-col items-center justify-center">
          <BlueCircle size={50} />
          <h1 className="text-4xl font-bold pb-4">
            Olá, como posso te ajudar?👋
          </h1>
          <p className="text-black/50 text-lg">
            Digite sua mensagem abaixo para começar a conversa.
          </p>

          <div className="w-full max-w-2xl mt-6 pt-10">
            <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-full bg-white shadow-sm">
              <Input
                placeholder="Ask me anything..."
                className="flex-1 border-none bg-transparent focus:outline-none focus:ring-0 shadow-none"
              />
              <div className="flex items-center gap-2">
                <Button className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <Send className="text-gray-50 w-5" />
                </Button>
              </div>
            </div>

            <p className="text-xs text-black/30 text-center pt-10">
              O Orbita Chat pode cometer erros, por favor, verifique as
              informações antes de tomar decisões com base nas respostas
              fornecidas.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
