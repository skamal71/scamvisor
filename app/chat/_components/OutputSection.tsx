"use client";
import React, { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Message = { role: "mark" | "jane" | "user"; content: string };

interface Props {
  chatHistory: Message[];
  loading: boolean;
}

export default function OutputSection({ chatHistory, loading }: Props) {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (chatRef.current)
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    });
  }, [chatHistory, loading]);

  return (
    <div
      ref={chatRef}
      className="bg-white shadow-md rounded-lg p-5 h-[80vh] overflow-y-auto flex flex-col gap-6"
    >
      {chatHistory
        .filter((m) => m.role !== "user")
        .map((msg, idx) => {
          const isJane = msg.role === "jane";
          return (
            <div
              key={idx}
              className={`flex items-start gap-4 animate__animated animate__fadeInUp ${
                isJane ? "justify-end" : "justify-start"
              }`}
            >
              {!isJane && (
                <Avatar>
                  <AvatarImage src="scam.jpg" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`p-3 rounded-lg max-w-md ${
                  msg.role === "mark"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-gray-100 text-blue-800"
                }`}
              >
                <p className="font-semibold">
                  {msg.role === "mark" ? "Mark" : "Jane"}
                </p>
                <p>{msg.content}</p>
              </div>
              {isJane && (
                <Avatar>
                  <AvatarImage src="grandma.avif" />
                  <AvatarFallback>J</AvatarFallback>
                </Avatar>
              )}
            </div>
          );
        })}
      {loading && (
        <div className="flex justify-end items-start gap-4 animate-pulse">
          <div className="bg-gray-200 p-3 rounded-lg max-w-md">
            <p className="font-semibold text-gray-700">Jane</p>
            <p className="text-gray-400">Typing...</p>
          </div>
          <Avatar>
            <AvatarImage src="grandma.avif" />
            <AvatarFallback>J</AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
}
