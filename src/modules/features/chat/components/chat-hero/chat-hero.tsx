import { Button } from "@/shared/components/ui/button";
import { Settings } from "lucide-react";

export const ChatHero = () => {
  return (
    <main className="h-16 border-b border-gray-200 flex flex-col justify-center ">
      <section className="w-full flex justify-between items-center px-20 ">
        <div className="flex gap-2">
          <h1 className="font-bold">Orbita Chat</h1>
          <div className="bg-gray-100 px-2 flex items-center justify-center rounded-md">
            <p className="text-xs text-gray-400 font-semibold">PLUS</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant={"outline"} className="h-10 hover:bg-black/5">
            <div className="flex gap-1 justify-center items-center">
              <h1 className="text-black/70">Configuração</h1>
              <Settings className="text-black/70" />
            </div>
          </Button>

          {/* <Button className="h-10 hover:bg-blue-wrong/80 rounded-full px-5 bg-blue-wrong text-white">
            <div className="flex gap-1 justify-center items-center">
              <h1>Novo chat</h1>
              <Plus />
            </div>
          </Button> */}
        </div>
      </section>
    </main>
  );
};
