import { AddChat, getChat } from "./chat/server"
import { getMessage, sendMessage } from "./messages/server"
import { searchUser } from "./search/server"

export const api ={searchUser,AddChat,getChat,getMessage,SendMessage: sendMessage}