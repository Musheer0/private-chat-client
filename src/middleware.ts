import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
const private_routes = [
    '/chats',
    '/account'
]
const auth_routes = [
    '/login'
]
export const middleware = (req:NextRequest)=>{
    const session = getSessionCookie(req);
    if(session ){
        if(auth_routes.includes(req.nextUrl.pathname)){
    return NextResponse.redirect(new URL("/chats", req.url));

        }
    }
    else if(private_routes.includes(req.nextUrl.pathname)){
    return NextResponse.redirect(new URL("/login", req.url));

    }
}