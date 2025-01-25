"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Message {
  role: "user" | "assistant";
  content: string;
  time: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentTypingIndex, setCurrentTypingIndex] = useState(-1);
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      const formattedContent = formatAIResponse(data.content);
      const assistantMessage: Message = {
        role: "assistant",
        content: formattedContent,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const newUpdatedMessages = [...updatedMessages, assistantMessage];
      setMessages(newUpdatedMessages);
      localStorage.setItem("chatMessages", JSON.stringify(newUpdatedMessages));
      setCurrentTypingIndex(newUpdatedMessages.length - 1);
      setDisplayedWords([]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const formatAIResponse = (content: string) => {
    const paragraphs = content.split("\n\n");

    return paragraphs
      .map((paragraph) => {
        if (paragraph.includes("- ")) {
          const listItems = paragraph.split("- ");
          return `<p>${listItems[0]}</p><ul>${listItems
            .slice(1)
            .map((item) => `<li>${item.trim()}</li>`)
            .join("")}</ul>`;
        }

        if (paragraph.toLowerCase().startsWith("step")) {
          return `<p><strong>${paragraph}</strong></p>`;
        }

        return `<p>${paragraph}</p>`;
      })
      .join("");
  };
  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <header className="bg-gray-900 p-4 text-center fixed top-0 left-0 right-0 z-10 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Personal AI Advisor</h1>
        <Button
          onClick={clearChat}
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white"
        >
          <Trash2 className="h-5 w-5" />
          <span className="sr-only">Clear Chat</span>
        </Button>
      </header>

      <div className="flex flex-1 overflow-hidden pt-16">
        <div className="hidden md:flex flex-col items-center space-y-6 p-6 border-r border-gray-800">
          <a href="#" className="text-gray-400 hover:text-white">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>

        <div className="flex-1 flex flex-col max-w-4xl mx-auto p-4 overflow-hidden">
          <div
            ref={chatBodyRef}
            className="flex-1 overflow-y-auto mb-4 space-y-4 custom-scrollbar"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar
                  className={`${
                    message.role === "assistant"
                      ? "bg-purple-600"
                      : "bg-blue-600"
                  }`}
                >
                  <AvatarFallback>
                    {message.role === "assistant" ? "AI" : "ME"}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`flex flex-col ${
                    message.role === "user" ? "items-end" : ""
                  }`}
                >
                  <div className="bg-gray-800 rounded-lg p-4 max-w-[80%]">
                    {index === currentTypingIndex ? (
                      <>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: displayedWords.join(" "),
                          }}
                        />
                        <span className="animate-pulse">|</span>
                      </>
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{ __html: message.content }}
                      />
                    )}
                  </div>
                  <span className="text-sm text-gray-500 mt-1">
                    {message.time}
                  </span>
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
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="mt-auto">
            <div className="relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Write a message..."
                className="w-full bg-gray-900 border-gray-800 pr-12"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-pink-200 text-black hover:bg-pink-300"
                disabled={isLoading}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </form>
        </div>

        <div className="hidden lg:flex flex-col items-center justify-center gap-4 p-6 border-l border-gray-800">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === 0 ? "bg-white" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
