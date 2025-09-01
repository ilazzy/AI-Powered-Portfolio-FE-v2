"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { SendHorizontal } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [predictions, setPredictions] = useState<string[]>([]);

  const starterPrompts = [
    "What certifications does he hold?",
    "Is Syed aware of security when creating APIs?",
    "He good at Data Structures & Algorithms (DSA)?",
    "Has Syed Ahamed worked on AI-driven projects?",
  ];

  const prediction = [
    "What certifications does he hold?",
    "Is Syed aware of security when creating APIs?",
    "Has Syed Ahamed worked on AI-driven projects?",
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    const aiPlaceholderId = (Date.now() + 1).toString();
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: aiPlaceholderId, text: "", sender: "ai" },
    ]);

    try {
      await handleApiCall(userMessage.text, aiPlaceholderId);
    } catch (error) {
      console.error("API call failed:", error);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === aiPlaceholderId
            ? {
                ...msg,
                text: "Sorry, I'm having trouble connecting right now. Please try again later.",
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  function linkifyText(text: string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, i) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={i}
            href={part}
            className="text-blue-400 underline hover:text-blue-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            {part}
          </a>
        );
      } else {
        return <span key={i}>{part}</span>;
      }
    });
  }

  const userId = useMemo(() => {
    return "user-" + Math.random().toString(36).substring(2, 14);
  }, []);

  const handleApiCall = async (prompt: string, aiMessageId: string) => {
    try {
      // hide predictions before new query sent to AI
      setPredictions([]);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-forwarded-for": "0.0.0.0",
          },
          body: JSON.stringify({
            message: prompt,
            sender: userId,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 429) {
          const data = await response.json();
          const retryAfter = data.retryIn;
          const waitMessage = `Oops! I'm thinking too fast and need a quick nap. 💤 Be back soon! in ${retryAfter} seconds. \nreason: ratelimit exceeded`;

          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === aiMessageId ? { ...msg, text: waitMessage } : msg
            )
          );
          return;
        }

        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const replyText = data.ai_response || "No response received";

      // Typing effect simulation
      let currentText = "";
      for (const char of replyText) {
        await new Promise((resolve) => setTimeout(resolve, 15));
        currentText += char;
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === aiMessageId ? { ...msg, text: currentText } : msg
          )
        );
      }

      // setTimeout(() => {
      // once the text are streamed, then show the predictions
      setPredictions(prediction);
      // }, 2500);
    } catch (error) {
      console.error("API call failed:", error);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === aiMessageId
            ? {
                ...msg,
                text: "Sorry, I'm having trouble connecting right now. Please try again later.",
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white font-sans">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 lg:px-6 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <span className="glow-motion-icon w-10 h-10 inline-block"></span>
          {/* <img src="/sparkle.svg" alt="Sparkle" className="mr-1 h-10 w-10" /> */}
          <span className="text-3xl font-bold">Amicia 4.0</span>
        </div>
      </div>

      {/* Main chat area */}
      <div
        className="flex-1 overflow-y-auto py-20 custom-scrollbar flex lg:justify-center"
        style={{
          backgroundImage: `radial-gradient(ellipse at center, rgba(30, 41, 59, 0.4) 0%, transparent 30%)`,
        }}
      >
        <div className="flex w-full">
          <div className="hidden lg:block w-1/5"></div>

          <div className="w-full lg:w-3/5 px-4 lg:px-3">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <div className="mb-8">
                  <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                    Hello, I'm Amicia! How can I assist you today?
                  </h1>
                  <p className="text-gray-400">
                    I'm AI-powered representative for Syed Ahamed. Feel free to
                    ask me anything about Syed Career, and I'll be happy to
                    help!
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
                  {starterPrompts.map((prompt, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 border border-gray-700 rounded-2xl p-4 lg:p-6 cursor-pointer hover:bg-gray-700 transition-colors duration-200"
                      onClick={() => setInputMessage(prompt)}
                    >
                      <p className="text-sm font-semibold text-white">
                        {prompt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xl p-3 rounded-2xl ${
                        msg.sender === "user"
                          ? "bg-purple-600 rounded-br-none text-white"
                          : "bg-gray-800 rounded-bl-none text-gray-200"
                      }`}
                    >
                      {msg.sender === "ai" ? linkifyText(msg.text) : msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <div className="hidden lg:block w-1/5"></div>
        </div>
      </div>

      {/* Prediction slider */}
      {messages.length > 0 && predictions.length > 0 && (
        <div className="flex justify-center bg-gray-900 border-t border-gray-800">
          <div className="prediction-slider w-full lg:w-3/5 flex overflow-x-auto space-x-2 py-2 px-4">
            {predictions.map((item, index) => (
              <button
                key={index}
                className="flex-shrink-0 bg-gray-800 border border-gray-700 rounded-2xl px-4 py-2 text-white hover:bg-gray-700 transition-colors duration-200"
                onClick={() => setInputMessage(item)}
              >
                <span className="shiny-text">{item}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area aligned with chat width */}
      {/* Input area */}
      <div className="flex justify-center p-4 lg:p-6 bg-gray-900 border-t border-gray-800">
        <form
          onSubmit={handleSendMessage}
          className="w-full lg:w-3/5 flex items-center space-x-4 relative"
        >
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              className="w-full pl-5 pr-12 py-2 bg-gray-800 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors duration-200"
              placeholder="Ask anything..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center p-3 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-gray-900"
            disabled={isLoading || !inputMessage.trim()}
          >
            <SendHorizontal className="h-5 w-5 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}
