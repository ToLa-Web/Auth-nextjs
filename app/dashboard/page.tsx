"use client";
import { useAppHook } from "@/context/AppProvider";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

interface ProductType {
  id?: number;
  title: string;
  description?: string;
  cost?: number;
  file?: string;
  banner_image?: File | null;
}

const Dashboard: React.FC = () => {
  const { authToken } = useAppHook();
  //page load when authToken is available
  useEffect(() => {
    if (!authToken) {
      route.push("/auth");
      return;
    }
    fetchAllProduct();
  }, [authToken]);

  const fileRef = React.useRef<HTMLInputElement>(null);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<ProductType>({
    title: "",
    description: "",
    cost: 0,
    file: "",
    banner_image: null,
  });
  const route = useRouter();
  // On change form input
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      //File uploaded
      setFormData({
        ...formData,
        banner_image: event.target.files[0],
        file: URL.createObjectURL(event.target.files[0]),
      });
    } else {
      //NO file uploaded
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };
  // form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (isEdit) {
        //edit Operation
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${formData.id}`,
          {
            ...formData,
            _method: "PUT",
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.status) {
          toast.success(response.data.message);
          setFormData({
            id: 0,
            title: "",
            description: "",
            cost: 0,
            file: "",
            banner_image: null,
          });
          if (fileRef.current) {
            fileRef.current.value = "";
          }
          setIsEdit(false);
        }
        fetchAllProduct();
      } else {
        //add Operation
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/products`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.status) {
          fetchAllProduct();
          toast.success(response.data.message);
          setFormData({
            id: 0,
            title: "",
            description: "",
            cost: 0,
            file: "",
            banner_image: null,
          });
          if (fileRef.current) {
            fileRef.current.value = "";
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          if (response.data.status) {
            //toast.success(response.data.message)
            fetchAllProduct();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6">
        <div className="grid md:grid-cols-2 gap-6 ">
          {/* Left Side: Form */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              {isEdit ? "Edit" : "Add"} Product
            </h4>
            <form onSubmit={handleSubmit}>
              <input
                className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                name="title"
                value={formData.title}
                placeholder="Title"
                onChange={handleOnChange}
                required
              />
              <input
                className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                name="description"
                value={formData.description}
                placeholder="Description"
                onChange={handleOnChange}
                required
              />
              <input
                className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                name="cost"
                value={formData.cost}
                placeholder="Cost"
                type="number"
                onChange={handleOnChange}
                required
              />
              {/* Image Preview */}
              <div className="mb-3">
                {formData.file && (
                  <img
                    src={formData.file}
                    alt="Preview"
                    id="bannerPreview"
                    className="w-24 h-24 object-cover rounded-md"
                    style={{ width: "50%", height: "50%" }}
                  />
                )}
              </div>
              <input
                className="w-full mb-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700 dark:file:bg-gray-700 dark:file:text-gray-300 dark:hover:file:bg-gray-600"
                type="file"
                ref={fileRef}
                onChange={handleOnChange}
                id="bannerInput"
              />

              <button
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                type="submit"
              >
                {isEdit ? "Update" : "Add"} Product
              </button>
            </form>
          </div>

          {/* Right Side: Table */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-100">
                <tr>
                  <th className="px-6 py-3 font-semibold tracking-wider">ID</th>
                  <th className="px-6 py-3 font-semibold tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 font-semibold tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 font-semibold tracking-wider">
                    Banner
                  </th>
                  <th className="px-6 py-3 font-semibold tracking-wider">
                    Cost
                  </th>
                  <th className="px-6 py-3 font-semibold tracking-wider text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                {products.map((product, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                      {product.id}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                      {product.title}
                    </td>

                    <td className="px-6 py-4">
                      {product.banner_image ? (
                        <img
                          src={product.banner_image}
                          alt="Product"
                          className="w-14 h-14 object-cover rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-600">
                          <svg
                            className="w-6 h-6 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      ${product.cost}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">
                        <button
                          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-200"
                          onClick={() => {
                            setFormData({
                              id: product.id,
                              title: product.title,
                              cost: product.cost,
                              description: product.description,
                              file:
                                typeof product.banner_image === "string"
                                  ? product.banner_image
                                  : "",
                            });
                            setIsEdit(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-all duration-200"
                          onClick={() => handleDelete(typeof product.id === "number" ? product.id : 0)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
