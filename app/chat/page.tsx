"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import ChatBody from "@/components/ChatBody"; 
import Header from "@/components/Header"; 
import Sidebar from "@/components/Sidebar"; 
import { Button } from "@/components/ui/button";

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
  

  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      const initialMessage: Message = {
        role: "assistant",
        content: "Hello! How can I assist you today?",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([initialMessage]);
      localStorage.setItem("chatMessages", JSON.stringify([initialMessage]));
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, []);

  useEffect(() => {
    if (currentTypingIndex >= 0 && currentTypingIndex < messages.length) {
      const message = messages[currentTypingIndex];
      if (message.role === "assistant") {
        setIsTyping(true);
        const words = message.content.split(" ");
        let wordIndex = 0;
        const typingInterval = setInterval(() => {
          if (wordIndex < words.length) {
            setDisplayedWords((prev) => [...prev, words[wordIndex]]);
            wordIndex++;
          } else {
            clearInterval(typingInterval);
            setCurrentTypingIndex(-1);
            setIsTyping(false);
          }
        }, 100); 

        return () => clearInterval(typingInterval);
      }
    }
  }, [currentTypingIndex, messages]);

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

  const clearChat = () => {
    const initialMessage: Message = {
      role: "assistant",
      content: "Chat cleared. How can I assist you today?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([initialMessage]);
    localStorage.setItem("chatMessages", JSON.stringify([initialMessage]));
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <Header clearChat={clearChat} /> 
      <div className="flex flex-1 overflow-hidden pt-16">
        <Sidebar position="left" /> 
        <div className="flex-1 flex flex-col max-w-4xl mx-auto p-4 overflow-hidden">
          <ChatBody
            messages={messages}
            currentTypingIndex={currentTypingIndex}
            displayedWords={displayedWords}
            isLoading={isLoading}
            isTyping={isTyping}
          />
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
        <Sidebar position="right" /> 
      </div>
    </div>
  );
}
