"use client"

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon } from "lucide-react";
import { useMessageStore } from "@/stores/chat-message-store";
import { api } from "@/actions/api";
import { useSession } from "@/lib/auth-client";

interface InputProps {
  id: string;
}

const ChatInput: React.FC<InputProps> = ({ id }) => {
  const [value, setValue] = useState("");
  const {id:chatid,addMessage} = useMessageStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading ,setIsloading] = useState(false);
  const {data} = useSession()
  // Auto resize effect
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);
  const handleSubmit = async(e: React.FormEvent) => {
    console.log(data?.user, chatid)
    e.preventDefault();
    if(!chatid || !data?.user) return;
    setIsloading(true);
    const response = await api.SendMessage(data.user.id,value,id);
    if(response) addMessage(response);
    setValue("");
    setIsloading(false)
  };
if(data)
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2 w-full">
      <Textarea
      disabled={isLoading}
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
        className="resize-none overflow-hidden min-h-[40px] flex-1"
        id={id}
      />
      <Button 
      
      type="submit" variant={'secondary'} disabled={!value.trim()|| isLoading}>
        <SendIcon/>
      </Button>
    </form>
  );
};

export default ChatInput;
