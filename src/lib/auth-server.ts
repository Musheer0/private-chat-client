import { auth } from "@/auth";
import { headers } from "next/headers";

export const getServerAuth = async()=>{
    const session = await auth.api.getSession({headers:await headers()});
       return session
}