// store/message-store.ts
import { formate_message } from "@/actions/messages/server";
import { create } from "zustand";


type MessageStore = {
  messages: formate_message[];
  id: string | null;
  addMessages: (msgs: formate_message[]) => void;
  addMessage: (msg: formate_message) => void;
  setId: (id: string | null) => void;
  reset: () => void;
};

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  id: null,

  addMessages: (msgs) =>
    set((state) => ({
      messages: [ ...msgs,...state.messages],
    })),

  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),

  setId: (id) => set({ id }),

  reset: () =>
    set({
      messages: [],
      id: null,
    }),
}));
