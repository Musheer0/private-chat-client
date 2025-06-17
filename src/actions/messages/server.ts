"use server"

import { getServerAuth } from "@/lib/auth-server"
import prisma from "@/prisma";
import { Message, Type } from "@prisma/client";
export type formate_message = {
    chat_id: string;
    content: string;
    sender_id: string;
    sentbyyou: boolean;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    type: Type
}
 const FormatMsg = (msg:Message,session:string)=>{
      const {latitude,longitute,friend_is,chat,sender_id,...rest} = msg
      console.log(latitude,longitute)
        return {
            ...rest,
            chat_id: friend_is,
            content:chat,
            sender_id,
            sentbyyou: sender_id===session
        }
}
export const getMessage = async(chatis:string,nextcursor:string|null)=>{
        const session = await getServerAuth();
    if(!session?.user)  return {error:'unAuthorized',messages:null,nextCursor:null};
    const messages = await prisma.message.findMany({
        where: {
            friend_is: chatis,
        },
        orderBy:{
            updatedAt:'desc'
        },
        take:11,
        cursor: nextcursor ? {id:nextcursor} : undefined,
        skip:nextcursor ? 1:0
        });

    const formate_messages = messages.map((msg)=>{
       return FormatMsg(msg,session.user.id);
    });
    const Cursor = messages[messages.length-1]?.id;
    return {
        messages:formate_messages,
        nextCursor: Cursor,
        error:null
    }
};
export const sendMessage = async(sender_id:string,content:string,chatId:string)=>{
    const session = await getServerAuth();
    if(!session?.user)  return null
    if(!sender_id || !chatId || !content) return null;

    try {
        const message = await prisma.message.create({
            data:{
                friend_is:chatId,
                sender_id,
                chat:content
            }
        });
     if(message) {

        return FormatMsg(message,session.user.id);
     }
     else return null
    } catch (error) {
        console.log('error from send message', error);
        return null
    }
}