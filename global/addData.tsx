"use client";
import React, { useState } from 'react'
import { useGlobalStore } from './zustandStore';

export const AddData = () => {
    // 1. Get everything from the store
    const addData = useGlobalStore((state) => state.addData);
    const loading = useGlobalStore((state) => state.loading);

    const [inputValue, setInputValue] = useState("");

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        if (loading || !inputValue.trim()) return;

        try {
            // 2. Just call the store function! No need for Firebase imports here.
            await addData(inputValue);
            setInputValue("");
            console.log("Success: Store updated everything");
        } catch (e) {
            alert("Something went wrong");
        } 
    };

    return (
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <input 
                type="text" 
                required 
                placeholder="Type status..."
                className="input input-bordered w-full text-[clamp(.8rem,2vw,1rem)]" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
            />
            
            <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
            >
                {loading ? <span className="loading loading-spinner"></span> : "Send Data"}
            </button>
        </form>
    );
}