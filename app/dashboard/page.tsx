"use client";
import { useAppHook } from "@/context/AppProvider";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

interface ProductType {
  title: string;
  description: string;
  cost: number;
  file: string;
  banner_image: File | null;
}

const Dashboard: React.FC = () => {
  const { isloading, authToken } = useAppHook();

  useEffect(() => {
      if (!authToken) {
        route.push("/auth");
      }
    }, [authToken]);

  const fileRef = React.useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState<ProductType>({
    title: "",
    description: "",
    cost: 0,
    file: "",
    banner_image: null
  });
  const route = useRouter();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    if (event.target.files){
      //File uploaded
      setFormData({
        ...formData,
        banner_image: event.target.files[0],
        file: URL.createObjectURL(event.target.files[0])
      })
    }else {
      //NO file uploaded
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      })
    } 
  }
  // form submission
  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data"
        }
      })

      if (response.data.status) {
        toast.success(response.data.message)
        setFormData({
          title: "",
          description: "",
          cost: 0,
          file: "",
          banner_image: null
        })
        if (fileRef.current) {
          fileRef.current.value = "";
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

 

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6">
        <div className="grid md:grid-cols-2 gap-6 ">
          {/* Left Side: Form */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Add Product
            </h4>
            <form onSubmit={ handleSubmit }>
              <input
                className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                name="title"
                value={formData.title}
                placeholder="Title"
                onChange={ handleOnChange }
                required
              />
              <input
                className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                name="description"
                value={formData.description}
                placeholder="Description"
                onChange={ handleOnChange }
                required
              />
              <input
                className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                name="cost"
                value={formData.cost}
                placeholder="Cost"
                type="number"
                onChange={ handleOnChange }
                required
              />
              {/* Image Preview */}
              <div className="mb-3">
                { formData.file && (
                  <img
                  src={formData.file}
                  alt="Preview"
                  id="bannerPreview"
                  className="w-24 h-24 object-cover rounded-md"
                  style={{ width: "100%", height: "100%" }}
                />
                )}    
              </div>

              <input
                className="w-full mb-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700 dark:file:bg-gray-700 dark:file:text-gray-300 dark:hover:file:bg-gray-600"
                type="file"
                ref={ fileRef }
                onChange={ handleOnChange }
                id="bannerInput"
              />

              <button
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                type="submit"
              >
                Add Product
              </button>
            </form>
          </div>

          {/* Right Side: Table */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b">ID</th>
                  <th className="px-4 py-2 border-b">Title</th>
                  <th className="px-4 py-2 border-b">Banner</th>
                  <th className="px-4 py-2 border-b">Cost</th>
                  <th className="px-4 py-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-2 border-b">1</td>
                  <td className="px-4 py-2 border-b">Sample Product</td>
                  <td className="px-4 py-2 border-b">
                    <img
                      src="#"
                      alt="Product"
                      className="w-12 h-12 object-cover rounded"
                      style={{ width: "50%", height: "50%" }}
                    />
                  </td>
                  <td className="px-4 py-2 border-b">$100</td>
                  <td className="px-4 py-2 border-b space-x-2">
                    <button className="px-3 py-1 bg-yellow-400 text-white text-xs rounded hover:bg-yellow-500">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
