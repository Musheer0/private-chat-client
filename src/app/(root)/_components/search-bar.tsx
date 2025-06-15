"use client"
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import React, { useState } from 'react'

const SearchBar = () => {
    const [query, SetQuery] = useState('');
    const HandleSubmit = async()=>{
        console.log(query);
    }
  return (
    <div className='search-bar p-2 py-4 relative w-full'>
        <Input
        defaultValue={query}
        onChange={(e)=>SetQuery(e.target.value)}
        placeholder='Search your Friends'
        className='pl-8'
        />
        <SearchIcon size={14} className='absolute top-1/2 -translate-y-1/2 text-muted-foreground left-4'/>
    </div>
  )
}

export default SearchBar