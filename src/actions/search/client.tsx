"use client"
import { api } from "../api";
import { useState } from "react";
import { searchStore } from "@/stores/search-store";

export const useSearch = ()=>{
    const [error, setError] = useState(false)
    const {setIsLoading , addResults,IsLoading} = searchStore()
    const searchUser = async(query:string)=>{
       try {
        console.log(query)
        setIsLoading(true)
 
        const api_users = await api.searchUser(query);
        setIsLoading(false);

        addResults(api_users);
       } catch (error)  {
        console.log(error)
        setError(true)
        return []
       }
    }

    return {searchUser,IsLoading,error}
}