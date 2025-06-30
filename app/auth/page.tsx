"use client"

import { useAppHook } from "@/context/AppProvider";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface fromData {
  name?: string,
  email: string,
  password: string,
  password_confirmation?: string
}

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState<fromData>({
    name: "",
    email: "",
    password:"",
    password_confirmation:""
  })
  const route = useRouter()

  const { login, register, authToken, isloading } = useAppHook();

  useEffect(() => {
    if (authToken){
      route.push("/dashboard")
    }
  },[authToken, isloading])

  const handlechange = ( event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData ({
      ...formData,
      [event.target.name]:event.target.value
    })
  }

  const handleSubmit = async( event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLogin) {
      try{
        await login(formData.email, formData.password)
      }catch(error) {
        console.log(`Authentication error ${error}`)
      }
    }else {
     try {
      await register(formData.name!, formData.email, formData.password, formData.password_confirmation!)
     } catch(error) {
      console.log(error)
     }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 w-full max-w-md">
        <h3 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">{isLogin ? "Login" : "Register"}</h3>
        <form className="mt-4 space-y-3" onSubmit={ handleSubmit }>
          { !isLogin && (
            <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={ handlechange }
            required
          />
          )}
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={ handlechange }
            required
          />
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={ handlechange }
            required
          />
          { !isLogin && (
            <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            name="password_confirmation"
            type="password"
            placeholder="Confirm Password"
            value={formData.password_confirmation}
            onChange={ handlechange }
            required
          />
          )}
          <button
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            type="submit"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          {!isLogin ? "Don't have an account?" : "Already have an accout?"}
          <span 
            className="text-sky-600 hover:text-sky-800 cursor-pointer" 
            onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Register" : "Login"}</span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
 