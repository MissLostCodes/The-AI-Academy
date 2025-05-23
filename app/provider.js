"use client"; // useeffect can only be used inside client component
import React from "react";
import {useUser} from "@clerk/nextjs";
import {useEffect} from "react";
import {db} from "@/configs/db";
import {USER_TABLE} from "@/configs/schema";
import {eq} from "drizzle-orm"; 
import axios from "axios";

function Provider({children}){
    const {user} = useUser();  // this is a hook to get the user from clerk
   // these clerk  hooks can only be used inside clerk provider 
   // so we need to wrap the provider around the clerk provider 
   // that we alredy did in layout.js file 

   useEffect(()=>{
    user && CheckIsNewUser(); // calls checkisnewuser only when user is logged in
   },[user])

    const CheckIsNewUser =async()=>{
        try {
            const userData = {
                name: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress
            };
            
            const resp = await axios.post("/api/create-user", { user: userData });
            console.log(resp.data);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }
    return (
        <div>
            {children}
        </div>
    )
}

export default Provider;
