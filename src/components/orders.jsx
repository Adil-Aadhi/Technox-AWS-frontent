import axios from "axios"
import { useEffect, useState } from "react"
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import api from "../../axiosConfig";



function Order(){

    const [product,setProduct]=useState([])
    const [deleteOrder,setDeleteOrder]=useState(null)

    const navigate=useNavigate()

    const HandleOrders=async()=>{

        try{
            const res=await api.get(`/api/order/`)
            setProduct(res.data || [])
            console.log(typeof res.data)
        }
        catch(e){
            console.log("error on fetching orders",e);
        }
        
    }

const CancelOrders=async(orderid)=>{
    try{
    
        await api.patch(`/api/order/${orderid}/`)
            console.log("Order status updated to Cancel");
        setProduct(prev =>
        prev.map(order =>
            order.order_id === orderid
            ? { ...order, status: "Cancelled" }
            : order
        )
        )
    }
    catch(e){
        console.log("Error on cancel product",e)
    }
}



    useEffect(()=>{
        HandleOrders();
    },[])

    return(
        <div className="backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-xl">
            <div>
                {deleteOrder && (
                                          <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md rounded-2xl z-9999 ">
                                            <div className="bg-white/10 p-6 rounded-xl shadow-lg text-center space-y-4">
                                              <p className="text-lg font-medium text-white">Are you sure you want to cancel?</p>
                                              <div className="flex gap-4 justify-center">
                                                <button
                                                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 cursor-pointer transition-all duration-300 ease-in-out"
                                                  onClick={() => setDeleteOrder(null)}
                                                >
                                                  No
                                                </button>
                                                <button
                                                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer transition-all duration-300 ease-in-out"
                                                  onClick={() => {CancelOrders(deleteOrder);
                                                                    setDeleteOrder(null)
                                                  }}
                                                >
                                                  Yes
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                <div className="backdrop-blur-xl bg-white/3  rounded-2xl border border-white/20 shadow-2xl p-5">
                    <h1 className="text-4xl font-bold text-white text-center">ORDERS</h1>
                </div>
                {product.length > 0  ?(
                    <div>
                    {product
                            .slice()
                            .sort((a,b)=>new Date(b.date) - new Date(a.date))
                            .map((order,index)=>(
                        <div key={order.order_id} className="backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-xl text-white mb-3 mt-2">
                            <div className="text-start text-white text-sm mb-3">
                                <p><span className="font-bold">ORDER ID:</span> {order.order_id}</p>
                                <p><span className="font-bold">Date:</span> {" "}{new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <div>
                                {order.order_items.map((item,index)=>(
                                    <div key={index} className="relative backdrop-blur-lg rounded-2xl border bg-white/5 border-white/20 p-8 shadow-xl gap-3 mt-2 justify-center mb-3">
                                        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full font-semibold text-sm shadow-lg
                                            ${order.status === "Processing" ? "bg-orange-500 text-white" :
                                            order.status === "Shipped" ? "bg-blue-500 text-white" :
                                            order.status === "Delivered" ? "bg-green-500 text-white" :
                                            order.status === "Cancelled" ? "bg-red-500 text-white" :
                                            "bg-red-900 text-white"
                                            }`}>
                                            {order.status}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                            <img src={item.product.image} alt={item.product.name} onClick={()=> navigate(`/products/${item.product.id}`)}  className="w-35 h-42 object-cover rounded-lg transition-transform duration-500 hover:scale-105 cursor-pointer mt- sm:mt-0"/>
                                            <p className="text-start">{item.product.name}</p>
                                            </div>
                                            <div className="mt-2 md:mt-15">
                                                <p>{item.price}</p>
                                                <p>Qty: {item.quantity}</p>
                                            </div>
                                            <div className="text-white/80 text-start">
                                                    <h1 className="text-bold text-white mb-2">Shipping Address</h1>
                                                    <hr className="text-white/30 mb-2 w-40"/>
                                                    <p><span>House No:</span> {order.address?.house_no}</p>
                                                    <p><span>Landmark:</span> {order.address?.landmark}</p>
                                                    <p><span>Town/city:</span> {order.address?.town}</p>
                                                    <p><span>District:</span> {order.address?.district}</p>
                                                    <p><span>POST:</span> {order.address?.post}</p>
                                                    <p><span>Mobile:</span> {order.address?.mobile}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className=" flex text-start justify-between">
                                <p><span className="font-bold">Total Amount</span><span> {order.amount}</span></p>
                                {(order.status==="Shipped" ||  order.status==="Processing") &&(
                                    <FiTrash2 className="text-red-400 text-xl cursor-pointer" title="Cancel order" onClick={()=>setDeleteOrder(order.order_id)} />
                                ) }
                            </div>
                            <div>
                            </div>
                        </div> 
                    ))}
                </div>
                ):(
                    <div className="backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-xl text-white mb-3 mt-2">
                        <h2 className="text-2xl">No Orders Yet....</h2>
                        <div className="flex justify-center">
                            <button className="mt-7 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg w-50 h-13 cursor-pointer flex items-center justify-center gap-2"
                                    onClick={()=>navigate('/products')}>
                            <FiShoppingCart className="text-lg" />
                            <span>Please Shop</span>
                            </button>                        
                        </div>
                    </div>
                )}
                
            </div>
        </div>
    )
}

export default Order