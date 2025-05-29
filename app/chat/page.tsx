"use client";
import React, { useEffect, useState } from "react";
import { markPrompt } from "@/utils/prompts/markPrompt";
import { victimPrompt } from "@/utils/prompts/victim";
import FormSection from "./_components/FormSection";
import OutputSection from "./_components/OutputSection";

type Message = {
  role: "mark" | "jane" | "user";
  content: string;
};

async function callGPT(prompt: string): Promise<string> {
  const res = await fetch("/api/aimodel", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  // If the request failed, try to read the JSON error; fall back to status text
  if (!res.ok) {
    let message = `API Error (${res.status})`;
    try {
      const { error } = await res.json();
      if (error) message = error;
    } catch {
      /* ignore – response wasn’t JSON */
    }
    throw new Error(message);
  }
  const { response } = (await res.json()) as { response: string };
  return response;
}

export default function ChatPage() {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [markPromptUsed, setMarkPromptUsed] = useState(false);
  const [victimPromptUsed, setVictimPromptUsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateMarkResponse = async (janeMessage: string) => {
    setLoading(true);
    const promptText =
      `${!markPromptUsed ? markPrompt + "\n" : ""}` +
      chatHistory
        .filter((msg) => msg.role !== "user")
        .map(
          (msg) => `${msg.role === "mark" ? "Mark" : "Jane"}: ${msg.content}`
        )
        .join("\n") +
      (janeMessage ? `\nJane: ${janeMessage}` : "") +
      `\nMark:`;

    try {
      const responseText = await callGPT(promptText);
      setChatHistory((prev) => [
        ...prev,
        { role: "mark", content: responseText },
      ]);
      setMarkPromptUsed(true);
    } catch (e) {
      console.error("Mark generation error:", e);
    } finally {
      setLoading(false);
    }
  };

  const generateJaneResponse = async (markMsg: string, userAdvice: string) => {
    setLoading(true);
    const promptText =
      `${!victimPromptUsed ? victimPrompt + "\n" : ""}` +
      chatHistory
        .map((msg) =>
          msg.role === "mark"
            ? `Mark: ${msg.content}`
            : msg.role === "jane"
            ? `Jane: ${msg.content}`
            : ""
        )
        .join("\n") +
      `\nUser Advice: ${userAdvice}\nJane:`;

    try {
      const responseText = await callGPT(promptText);
      setChatHistory((prev) => [
        ...prev,
        { role: "user", content: userAdvice },
        { role: "jane", content: responseText },
      ]);
      setVictimPromptUsed(true);
      await generateMarkResponse(responseText);
    } catch (e) {
      console.error("Jane generation error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!markPromptUsed) {
      (async () => {
        await generateMarkResponse("");
      })();
    }
  }, [markPromptUsed]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-5 bg-indigo-50">
      {/* Output Section */}
      <div className="col-span-2">
        <OutputSection chatHistory={chatHistory} loading={loading} />
      </div>
      {/* Form Section */}
      <FormSection
        userFormInput={(advice) => {
          const lastMark =
            chatHistory.filter((m) => m.role === "mark").slice(-1)[0]
              ?.content || "";
          generateJaneResponse(lastMark, advice);
        }}
        loading={loading}
        chatHistory={chatHistory}
      />
    </div>
  );
}
