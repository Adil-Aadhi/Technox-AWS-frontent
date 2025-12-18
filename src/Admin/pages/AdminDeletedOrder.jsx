import React, { useEffect, useState } from "react";
import api from "../../../axiosConfig";
import Api from "../api/api";
import { useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { toast } from "react-toastify";

const SoftDeletedProducts = () => {
    const {products}=Api();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch soft deleted products
  const fetchDeletedProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get(`${products}deleted-products/`);
      setProduct(res.data);
      console.log(res.data)
    } catch (err) {
      console.error("Error fetching deleted products:", err);
      setError("Failed to load deleted products");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore=async(id)=>{
        try{
            
            const newStatus="active"
          
            const res=await api.patch(`${products}deleted-products/${id}/`,{
                status:newStatus
            })

            toast.success("product succesfully Restored", {
                style: {
                    background: "white",
                    color: "black",
                }})
            
                setProduct(prev => prev.filter(p => p.id !== id));

        }
        catch(e){
            console.log("Error on patching Restoring", e.response?.data || e);
            toast.error("Restore failed!");
        }
    }


  useEffect(() => {
    fetchDeletedProducts();
  }, []);

  if (loading) return <p className="text-center p-4">Loading deleted products...</p>;
  if (error) return <p className="text-red-500 text-center p-4">{error}</p>;

  return (
    <div className="p-6  min-h-screen">
        <button
                onClick={() => navigate("/admin/products")}
                className="flex items-center gap-3 group hover:cursor-pointer">
                <div className="bg-gradient-to-r from-red-500 to-orange-600 p-2 rounded-lg shadow-md">
                    <FiChevronRight
                    size={22}
                    className="text-white transform transition-transform group-hover:-translate-x-1 rotate-180"
                    />
                </div>
                <span className="text-lg font-medium text-gray-700 group-hover:text-gray-900">
                    Back
                </span>
        </button>
        <h1 className="text-3xl font-bold mb-8 text-gray-700">
        Soft Deleted Products
        </h1>

        {product.length === 0 ? (
            <div className="w-full  rounded-xl shadow p-6 text-center">
            <p className="text-gray-500 text-lg">No soft-deleted products found.</p>
            </div>
        ) : (
            <div className="overflow-x-auto">
            <table className="min-w-full bg-white p-1 rounded-xl shadow-lg overflow-hidden">
                <thead>
                <tr className="bg-gray-100 border-b">
                    <th className="p-3 font-semibold text-gray-600 text-left align-middle">Image</th>
                    <th className="p-3 font-semibold text-gray-600 text-left align-middle">Name</th>
                    <th className="p-3 font-semibold text-gray-600 text-left align-middle">Brand</th>
                    <th className="p-3 font-semibold text-gray-600 text-left align-middle">Price</th>
                    <th className="p-3 font-semibold text-gray-600 text-center align-middle">Actions</th>
                </tr>
                </thead>

                <tbody>
                {product.map((product, index) => (
                    <tr
                    key={product.id}
                    className={`border-b hover:bg-gray-50 transition ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-200"
                    }`}
                    >
                    <td className="p-3 align-middle">
                        <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                        />
                    </td>

                    <td className="p-3 align-middle text-left text-gray-700 font-medium">{product.name}</td>
                    <td className="p-3 align-middle text-left text-gray-600">{product.brand}</td>
                    <td className="p-3 align-middle text-left text-gray-800 font-semibold">₹{product.price}</td>

                    <td className="p-3 align-middle flex gap-3 justify-center">
                        <button
                        onClick={() => handleRestore(product.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition hover:cursor-pointer"
                        >
                        Restore
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        </div>

  );
};

export default SoftDeletedProducts;
