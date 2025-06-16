"use client"

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon } from "lucide-react";

interface InputProps {
  id: string;
}

const ChatInput: React.FC<InputProps> = ({ id }) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto resize effect
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Input from ${id}:`, value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2 w-full">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
        className="resize-none overflow-hidden min-h-[40px] flex-1"
        id={id}
      />
      <Button type="submit" variant={'secondaryk'} disabled={!value.trim()}>
        <SendIcon/>
      </Button>
    </form>
  );
};

export default ChatInput;
