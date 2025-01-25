// components/Header.tsx
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Trash2 } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  clearChat: () => void;
}

const Header: FC<HeaderProps> = ({ clearChat }) => {
  return (
    <header className="bg-gray-900 p-4 text-center fixed top-0 left-0 right-0 z-10 flex justify-between items-center">
      <Link href={"/"} className="flex items-center space-x-2 cursor-pointer">
        <Sparkles className="h-8 w-8 text-blue-500" />
        <span className="text-xl font-bold cursor-pointer">ChatGenie</span>
      </Link>
      <h1 className="hidden lg:block md:block md:text-2xl lg:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-lg">
  Empowering Conversations with ChatGenie
</h1>

      <Button
        onClick={clearChat}
        variant="ghost"
        size="sm"
        className="text-white hover:bg-red-800 bg-red-700"
      >
        <Trash2 className="h-5 w-5" />
        <span>Clear Chat</span>
      </Button>
    </header>
  );
};

export default Header;
