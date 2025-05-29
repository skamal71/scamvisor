import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

type Message = { role: "mark" | "jane" | "user"; content: string };

interface PROPS {
  userFormInput: (advice: string) => void;
  loading: boolean;
  chatHistory: Message[];
}

export default function FormSection({
  userFormInput,
  loading,
  chatHistory,
}: PROPS) {
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;
    userFormInput(trimmed);
    setMessage("");
  };

  return (
    <div className="p-5 shadow-md border rounded-lg flex flex-col h-[80vh] justify-between">
      <div className="flex flex-col items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <h4 className="text-center">
          You are a CS student who is fully aware of cyber crimes and phishing.
          Now advise your grandma so that she does not reveal any sensitive
          information to the scammer. Do note that your grandmother might not be
          as tech-savvy as you are.
        </h4>
        <p className="font-semibold">Good luck!</p>
      </div>

      <div className="mt-4 flex flex-col gap-3 overflow-y-auto flex-grow px-1">
        {chatHistory
          .filter((msg) => msg.role === "user")
          .map((msg, idx) => (
            <div key={idx} className="flex justify-end">
              <div className="bg-green-100 text-green-800 p-3 rounded-lg max-w-sm">
                <p className="font-semibold mb-1">You</p>
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
      </div>

      <form onSubmit={onSubmit} className="w-full flex gap-2 mt-4">
        <Input
          placeholder="Type your advice..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow"
        />
        <button
          type="submit"
          className="bg-gray-800 text-white px-4 py-1 rounded-lg"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
}
