// components/ChatBody.tsx
import { FC } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface Message {
  role: "user" | "assistant";
  content: string;
  time: string;
}

interface ChatBodyProps {
  messages: Message[];
  currentTypingIndex: number;
  displayedWords: string[];
  isLoading: boolean;
  isTyping: boolean;
}

const ChatBody: FC<ChatBodyProps> = ({ messages, currentTypingIndex, displayedWords, isLoading, isTyping }) => {
  return (
    <div className="flex-1 overflow-y-auto mb-4 space-y-4 custom-scrollbar">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex items-start gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
        >
          <Avatar
            className={`${
              message.role === "assistant" ? "bg-purple-600" : "bg-blue-600"
            }`}
          >
            <AvatarFallback>{message.role === "assistant" ? "AI" : "ME"}</AvatarFallback>
          </Avatar>
          <div className={`flex flex-col ${message.role === "user" ? "items-end" : ""}`}>
            <div className="bg-gray-800 rounded-lg p-4 max-w-[80%]">
              {index === currentTypingIndex ? (
                <>
                  <div dangerouslySetInnerHTML={{ __html: displayedWords.join(" ") }} />
                  <span className="animate-pulse">|</span>
                </>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: message.content }} />
              )}
            </div>
            <span className="text-sm text-gray-500 mt-1">{message.time}</span>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex items-start gap-4">
          <Avatar className="bg-purple-600">
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-2 max-w-[80%]">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      )}
      {isTyping && (
        <div className="flex items-start gap-4">
          <Avatar className="bg-purple-600">
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-2">
            <div className="bg-gray-800 rounded-lg p-4 max-w-[80%]">
              <span className="animate-pulse">Typing...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBody;
