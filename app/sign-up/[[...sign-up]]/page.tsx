"use client";
import { SignUp } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function Page() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the fade-in effect after the component mounts
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`flex items-center justify-center lg:min-h-screen min-h-[calc(100vh-64px)] transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <SignUp />
    </div>
  );
}
