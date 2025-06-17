import { prismachatwihtuser } from '@/query-types/prisma.query.type';

import {create} from 'zustand'
import {persist} from 'zustand/middleware'
type chat = prismachatwihtuser
interface store{
    chats:chat[],
    addChats:(data:chat[])=>void,
    addChat:(data:chat)=>void,
    getChatByEmail:(data:string)=>chat|null,
    initializeChat:(data:chat[])=>void,
}

export const chatStore = create<store>()(
  persist(
    (set, get) => ({
      chats: [],
      addChat: (data) => {
        set({ chats: [data, ...get().chats] });
      },
      addChats: (data) => {
        set({ chats: [...data, ...get().chats] });
      },
      getChatByEmail:(data)=>{
        const chats = get().chats;
        const exisitingchat = chats.find((chat)=>chat.Sender.email===data||chat.Reciever.email==data);
        return exisitingchat ||null
      },
      initializeChat(data) {
        set({chats:data})
      },
    }),
    {
      name: 'chat-storage',
    }
  )
);