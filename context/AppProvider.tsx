"use client"
import Loader from "@/components/Loader";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface AppProviderType {
    isloading: boolean,
    authToken:string | null,
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, confirmation_password: string) => Promise<void>,
    logout: () => void
}

const AppContext = createContext<AppProviderType | undefined>(undefined);

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`

export const AppProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {

    const [isloading, setIsloading] = useState<boolean>(true)
    const [authToken, setAuthToken] = useState<string | null>(null)
    const route = useRouter()

    useEffect(() => {

        const token = Cookies.get("authToken")

        if (token) {
            setAuthToken(token)
        }else{
            route.push("/auth")
        }
        setIsloading(false)
    })

    const login = async (email: string, password: string) => {
        setIsloading(true)
        try {
            const response = await axios.post(`${API_URL}/login` , {
                email,
                password
            })
            
            if (response.data.status) {
                Cookies.set("authToken", response.data.token,{expires: 7})
                toast.success("Login successful")
                setAuthToken(response.data.token)
                route.push("/dashboard")
            }else {
                toast.error("Invalid login")
            }

            console.log(response.data.status)
        } catch (error) {
            
        }finally{
            setIsloading(false);
        }

    };
    
    const register = async (name: string, email: string, password: string, confirmation_password: string) => {
        setIsloading(true)
        try {
            const response = await axios.post(`${API_URL}/register`, {
                name, 
                email,
                password, 
                confirmation_password
            })
            console.log(response)
        } catch (error) {
            
        } finally {
            setIsloading(false)
        }
    };

    const logout = () => {
        setAuthToken(null)
        Cookies.remove("authToken")
        setIsloading(false)
        toast.success("User Logged out")
        route.push("/auth")
    }

    return (
        <AppContext.Provider value={{ login, register, isloading, authToken, logout }}>
            { isloading ? <Loader/> : children}
        </AppContext.Provider>
    );
};

export const useAppHook = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useAppHook must be used within an AppProvider");
    }
    return context;
};