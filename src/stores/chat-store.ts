import { Friend } from '@prisma/client'
import {create} from 'zustand'
import {persist} from 'zustand/middleware'

interface store{
    chats:Friend[],
    addChats:(data:Friend[])=>void,
    addChat:(data:Friend)=>void
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
    }),
    {
      name: 'chat-storage',
    }
  )
);