import { FiSearch,FiBell,FiMessageSquare,FiUser,FiPackage,FiKey,FiMail,FiShoppingCart } from "react-icons/fi"
import {useContext,useState } from "react";
import { UsersContext } from "../context/userContext";
import Api from "../api/api"
import axios from "axios";
import api from "../../../axiosConfig";
import { toast } from "react-toastify";
import AdminLoader from "../layout/AdminLoader";

function AdminUser(){ 
    const {userList,setUserList,userCount,setSearch,setStatusFilter,statusFilter,page,setPage,hasNext,loading}=useContext(UsersContext);
    const {users}=Api();



    const UpdateStatus=async(id,currentStatus)=>{
        try{
            const newStatus=currentStatus==="active"?"inactive":"active"
            const res=await api.patch(`${users}${id}/`,{
                status:newStatus,
            })
            setUserList((prev)=>
            prev.map((u)=>
            u.id===id?{...u,status:newStatus}:u))
            console.log("role is updated")
            toast.success("Role is Succesfully Changed",{
                style:{
                    color: "black", 
                }
            })

        }
        catch(e){
            console.log("Erro on patching status",e)
        }
    }
    return(
        <div className="p-5">
            <div>
                <>
                    {loading && <AdminLoader />}
                </>
            </div>
            <main>
                <nav className="flex flex-wrap justify-between items-center bg-white/70 rounded-2xl p-4 md:p-6 backdrop-blur-lg shadow-sm">
                        <div className="flex gap-2 md:gap-3 items-center w-full md:w-auto justify-between md:justify-start">
                            <div className="flex gap-2 items-center">
                            <FiUser className="text-xl md:text-2xl mt-0.5 text-gray-700" />
                            <h1 className="text-lg md:text-2xl font-bold text-gray-800">Users</h1>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 md:gap-4 mt-3 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                            
                            <div className="relative flex-1 md:flex-none">
                            <FiSearch className="absolute left-3 top-2.5 text-gray-500" size={18} />
                            <input
                                type="text"
                                className="w-full md:w-64 bg-white rounded-2xl pl-10 pr-4 py-2.5 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all"
                                placeholder="Search..."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            </div>

                          

                            <div className="flex items-center gap-2 bg-white rounded-xl pl-2 pr-4 py-2 border border-gray-200">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">A</span>
                            </div>
                            <span className="hidden sm:block text-sm font-medium text-gray-700">Admin</span>
                            </div>
                        </div>
                        </nav>
                <div className="mt-5 flex justify-between">
                    <div>
                        <div className="rounded-2xl text-sm  bg-white/10 backdrop-blur-md border  border-white/20 shadow-lg shadow-black/10 py-2 px-4  text-black cursor-pointertransition-all ">
                            <span className="text-xl">Total users :</span>
                            <span className="text-red-400 text-xl"> {userCount}</span>
                        </div>
                    </div>
                    <select value={statusFilter}onChange={(e)=>setStatusFilter(e.target.value)} className="rounded-2xl text-sm  bg-white/10 backdrop-blur-md border  border-white/20 shadow-lg shadow-black/10 py-2 px-4  text-black cursor-pointertransition-all hover:bg-white/15focus:outline-nonefocus:ring-2 focus:ring-white/30">
                        <option className="bg-gray-800 text-white cursor-pointer">All</option>
                        <option className="bg-gray-800 text-white cursor-pointer">Active</option>
                        <option className="bg-gray-800 text-white cursor-pointer">Inactive</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
                    {userList.length >0 ?(
                        userList.map((user)=>(
                        <div key={user.id} className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-sm mt-5 hover:scale-102 transition-all duration-200 ease-in-out">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">#{user.id}</h3>
                                <div className={`px-3 py-1 rounded-full text-sm font-medium ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {user.status === 'active' ? 'Active' : 'Inactive'}
                                </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                                        <FiKey className="text-purple-600" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">User ID</p>
                                        <p className="font-medium text-gray-800">{user.id}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                    <FiUser className="text-blue-600" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Name</p>
                                        <p className="font-medium text-gray-800">{user.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="bg-green-100 p-3 rounded-lg mr-4">
                                        <FiMail className="text-green-600" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 text-start">Email</p>
                                        <p className="font-medium text-gray-800">{user.email}</p>
                                    </div>
                                </div>
                         </div>
            

                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                                    <FiShoppingCart className="text-orange-600" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Total Orders</p>
                                    <p className="font-medium text-gray-800 text-start">{user.order_count ||0}</p>
                                </div>
                            </div>
                        
                        <div className="flex items-center">
                            <div className="bg-pink-100 p-3 rounded-lg mr-4">
                                <FiPackage className="text-pink-600" size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Products Ordered</p>
                                <p className="font-medium text-gray-800 text-start">{user.product_count || 0}</p>
                            </div>
                        </div>
                        </div>
                        </div>
                        <div className="pt-2 mt-5">
                            <button 
                            className={`w-full py-2.5 rounded-lg font-medium transition-all ${user.status === 'active' 
                                ? 'bg-red-500 hover:bg-red-600 text-white' 
                                : 'bg-green-500 hover:bg-green-600 text-white'} cursor-pointer`}
                            onClick={() => 
                                UpdateStatus(user.id,user.status)
                            }
                            >
                            {user.status === 'active' ? 'Block User' : 'Unblock User'}
                        </button>
                    </div>
                    </div>
                    ))
                    ):(
                        <div className="col-span-full text-center py-10 text-gray-600 text-lg font-medium">
      No Users Found
    </div>
                    )
                    }
                    

                </div>

                    <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(prev => prev - 1)}
                        className="
                        flex items-center gap-2 px-5 py-2.5 rounded-full
                        bg-white shadow-md border border-gray-200
                        text-gray-700 font-medium
                        hover:bg-gray-100 transition-all
                        disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer
                        "
                    >
                        ← Prev
                    </button>

                    <span className="px-4 py-2 rounded-full bg-black text-white font-semibold shadow">
                        {page}
                    </span>

                    <button
                        disabled={!hasNext}
                        onClick={() => setPage(prev => prev + 1)}
                        className="
                        flex items-center gap-2 px-5 py-2.5 rounded-full
                        bg-white shadow-md border border-gray-200
                        text-gray-700 font-medium
                        hover:bg-gray-100 transition-all
                        disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer
                        "
                    >
                        Next →
                    </button>
                    </div>

                
            </main>
        </div>
    )
}

export default AdminUser