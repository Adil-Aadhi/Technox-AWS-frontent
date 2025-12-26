import { useState,useEffect } from "react"
import axios from "axios"
import { FaHeart,FaRegHeart } from "react-icons/fa";
import { FiShoppingCart,FiArrowLeft } from "react-icons/fi";
import useWishList from './customhook/customehook';
import useHandleCart from "./customhook/carthook";
import { useNavigate } from "react-router-dom";



function Wishlist() {
    const navigate = useNavigate();
    const { wishlist, ToggleWishList, loading } = useWishList();
    const { cartList,ToggleCart } = useHandleCart();

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white/80 backdrop-blur-sm">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-3 border-orange-500/30 border-t-orange-600 rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-700 font-medium">Loading your favorites...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8"
             style={{
                 background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #f0f9ff 100%)"
             }}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-5">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center text-sm text-gray-600 hover:text-orange-600 transition-colors mb-3 group"
                    >
                        <FiArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" /> 
                        Back to Shop
                    </button>
                    <div className="flex items-center justify-between">
                        <div className="flex gap-3">
                            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
                            <p className="text-gray-500 mt-1">({wishlist.length} items saved)</p>
                        </div>
                        {wishlist.length > 0 && (
                            <button 
                                onClick={() => navigate('/products')}
                                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                            >
                                Continue Shopping →
                            </button>
                        )}
                    </div>
                </div>

                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlist.map((item) => (
                            <div 
                                key={item.product.id} 
                                className="group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                            >
                                <button 
                                    onClick={() => ToggleWishList(item.product)}
                                    className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 hover:bg-red-50 transition-all duration-200"
                                    title="Remove from wishlist"
                                >
                                    <FaHeart size={16} className="text-red-500 fill-red-500" />
                                </button>

                                <div 
                                    className="relative aspect-[5/6] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 cursor-pointer"
                                    onClick={() => navigate(`/products/${item.product.id}`)}
                                >
                                    <img 
                                        src={item.product.image} 
                                        alt={item.product.name} 
                                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                <div className="p-3">
                                    <div className="mb-3">
                                        <h3 className="text-gray-900 font-semibold text-sm line-clamp-2 mb-1">
                                            {item.product.name}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full border border-gray-300" 
                                                 style={{backgroundColor: item.product.color.toLowerCase()}} />
                                            <span className="text-xs text-gray-500 font-medium">
                                                {item.product.color}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                                        <div>
                                            <span className="text-lg font-bold text-gray-900">
                                                ₹{item.product.price}
                                            </span>
                                        </div>
                                        {cartList?.some(c=>(c.product?.id ?? c.id) === item.product.id) ? (
    
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate("/cart");
                                                }}
                                                className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-md active:scale-95"
                                            >
                                                <FiShoppingCart size={14} />
                                                <span>Go to Cart</span>
                                            </button>

                                        ) : (

                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    ToggleCart(item.product);
                                                }}
                                                className="flex items-center gap-1.5 bg-black hover:bg-orange-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-md active:scale-95"
                                            >
                                                <FiShoppingCart size={14} />
                                                <span>Add to Cart</span>
                                            </button>
)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State - Premium Design */
                    <div className="max-w-md mx-auto">
                        <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 text-center shadow-lg border border-gray-200/50 overflow-hidden">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-5">
                                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-orange-300"></div>
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-blue-300"></div>
                            </div>
                            
                            <div className="relative">
                                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FaHeart className="text-orange-400 text-3xl" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">No Items Saved Yet</h2>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Discover amazing products and save your favorites here to build your perfect collection.
                                </p>
                                <button 
                                    onClick={() => navigate('/products')}
                                    className="relative bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
                                >
                                    Explore Products
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Wishlist