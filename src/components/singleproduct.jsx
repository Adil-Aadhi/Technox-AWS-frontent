import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaHeart } from "react-icons/fa";
import { FiShoppingCart,FiZap } from "react-icons/fi";
import useHandleCart from "./customhook/carthook";
import useWishList from './customhook/customehook';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../axiosConfig';



function SingleProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentLoading, setPaymentLoading] = useState(false);


    const {cartList,ToggleCart}=useHandleCart();
    const {wishlist,ToggleWishList}=useWishList()
    const navigate=useNavigate();


    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData?.id;

    

    const exist = cartList.some(item =>
    (item.product?.id ?? item.id) === product?.id);


    const HandleProducts = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/api/products/details/${id}/`);
            setProduct(response.data);
        } catch (e) {
            console.error("Error fetching product:", e);
            setError("Failed to load product details");
        } finally {
            setLoading(false);
        }
    };

    const passData=()=>{setLoading(true);
        setTimeout(()=>{
            navigate("/payment",{
            state:{
                product
            }
        });setLoading(false)
        },1000)
        
    }

    useEffect(() => {
        HandleProducts();
    }, [id]);

    if (loading) return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-8 flex flex-col items-center">
                        <div className="relative w-20 h-20 mb-4">
                            <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-white/50 animate-spin"></div>
                            <div className="absolute inset-2 rounded-full border-4 border-b-transparent border-white/30 animate-spin animation-delay-200"></div>
                            <div className="absolute inset-4 rounded-full border-4 border-l-transparent border-white/10 animate-spin animation-delay-400"></div>
                        </div>
                        <p className="text-white text-md font-medium">Loading...</p>
                    </div>
                </div>
    if (error) return <div className="flex min-h-screen items-center justify-center text-red-500">{error}</div>;
    if (!product) return <div className="flex min-h-screen items-center justify-center">Product not found</div>;




    return (
       <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-neutral-900 p-4">
       <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white/4 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl p-8 mt-15">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                <div className="space-y-4">
                    <div className=" backdrop-blur-lg rounded-xl border border-white/30 shadow-lg overflow-hidden">
                        <img 
                            src={product.image}
                            alt={product.name}
                            className='w-full h-96 object-contain '>
                        </img>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-100 rounded-lg overflow-hidden cursor-pointer">
                            <img
                                src={product.image}
                                alt={product.name}
                                className='w-full h-32 object-contain bg-white'>
                            
                            </img>
                        </div>
                        <div className="bg-gray-100 rounded-lg overflow-hidden cursor-pointer">
                            <img
                                src={product.image}
                                alt={product.name}
                                className='w-full h-32 object-contain bg-white'>
                            </img>
                        </div>
                    </div>
                </div>
                <div className=" backdrop-blur-lg rounded-xl border border-white/30 shadow-lg p-8 space-y-6">
                    <h1 className="text-3xl font-bold text-white mt-15">
                        {product.name}
                    </h1>
                    <p className="text-white/80 mt-10">
                        {product.description}
                    </p>
                    <div className="text-2xl font-semibold text-white">
                        ₹ {product.price}
                    </div>
                    {Number(product.totalquantity) > 0 && Number(product.totalquantity) <= 5 &&(
                        <div>
                            <p className='text-lg text-red-400'>Hurry ! limited stock</p>
                            <p className='text-lg text-red-400'>{product.totalquantity} left</p>
                        </div>
                    )}
                    {product.status==="active" && Number(product.totalquantity) > 0?(
                        <div  className="flex flex-wrap gap-4 pt-7">
                        <button className="flex-1 bg-orange-400 hover:bg-orange-500 text-white font-medium py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
                                onClick={()=>{
                                if(exist){
                                    toast.info(`${product.name} Already in the Cart`,{
                                                className: 'custom-danger-toast'
                                    })
                                    navigate('/cart')
                                }
                                else{
                                    ToggleCart(product)
                                }
                                }}>
                            <FiShoppingCart className="text-lg"/>
                            {exist?"Go To Cart":"Add to Cart"}
                        </button>
                        <button  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg border border-white/30 transition duration-300 ease-in-out transform hover:scale-105 backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer"
                                    onClick={()=>ToggleWishList(product)}>
                          <FaHeart className={`text-lg  ${wishlist.some(item=>item.product.id===product.id)?'text-red-500 fill-red-500': 'text-white'}`}/>  Wishlist
                        </button>
                        <button className="w-full bg-black hover:bg-black/50 text-white font-medium py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
                                onClick={()=>{userId?passData()
                                :toast.info("please login to purchase product",{
                                                className: 'custom-danger-toast'
                                    })}}>
                            <FiZap className="text-yellow-300 text-lg transition-transform duration-300 group-hover:scale-125 group-hover:animate-pulse"/>
                            Buy Now
                        </button>
                    </div>
                    ):(
                        <button className="w-full bg-red-500 hover:bg-black/50 text-white font-medium py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer">{Number(product.totalquantity)===0?"Out of stock":"Not Available"}</button>
                    )}
                    
                </div>
            </div>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl p-8 mt-10">
             <div className="bg-white/50 backdrop-blur-lg rounded-xl border border-white/30 shadow-lg p-8 space-y-6">
             <div>
                <h2 className='text-left text-xl font-semibold mb-4'>Product Specifications :-</h2>
             </div>
            <div className='p-1'>
                <table className='w-full border-collapse '>
                    <tbody>
                        <tr className='border-b border-white/30'>
                            <th className='py-3 px-4 text-left font-medium bg-white/10 rounded-tr-xl rounded-tl-xl'>Name</th>
                            <td className='py-3 px-4'>{product.name}</td>
                        </tr>
                        <tr className='border-b border-white/30'>
                            <th className='py-3 px-4 text-left font-medium bg-white/10'>Brand</th>
                            <td className='py-3 px-4'>{product.brand}</td>
                        </tr>
                        <tr  className='border-b border-white/30'>
                            <th className='py-3 px-4 text-left font-medium bg-white/10'>Amount</th>
                            <td className='py-3 px-4'>{product.price}</td>
                        </tr>
                        <tr className='border-b border-white/30'>
                            <th className='py-3 px-4 text-left font-medium bg-white/10'>Type</th>
                            <td className='py-3 px-4'>{product.type}</td>
                        </tr>
                        <tr className='border-b border-white/30'>
                            <th className='py-3 px-4 text-left font-medium bg-white/10'>Storage</th>
                            <td className='py-3 px-4'>{product.storage}</td>
                        </tr>
                        <tr className='border-b border-white/30'>
                            <th className='py-3 px-4 text-left font-medium bg-white/10'>Ram</th>
                            <td className='py-3 px-4'>{product.ram}</td>
                        </tr>
                        <tr className='border-b border-white/30'>
                            <th className='py-3 px-4 text-left font-medium bg-white/10'>CPU</th>
                            <td className='py-3 px-4'>{product.cpu}</td>
                        </tr>
                        <tr className='border-b border-white/30'>
                            <th className='py-3 px-4 text-left font-medium bg-white/10 rounded-br-xl rounded-bl-xl'>Display</th>
                            <td className='py-3 px-4'>{product.display}</td>
                        </tr>
                    </tbody>
                </table>
             </div>
             </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl p-8 mt-10">
            <div>
                <h2 className='text-left text-xl font-semibold mb-4 text-white'>Product Review :-</h2>
             </div>
             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/15 p-6 hover:border-white/30 hover:scale-102 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400">
                        J
                        </div>
                        <div>
                            <h4 className="font-medium text-white">John D.</h4>
                            <div className="flex text-amber-400 text-sm"> 
                                ★★★★★
                            </div>
                        </div>
                    </div>
                    <p className="text-white/80 text-sm">
                        "Absolutely love this product! The quality exceeded my expectations and it arrived quickly."
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/15 p-6 hover:border-white/30 hover:scale-102 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center text-amber-400">
                        S
                        </div>
                        <div>
                            <h4 className="font-medium text-white">Sarah</h4>
                            <div className="flex text-amber-400 text-sm"> 
                                ★★★★☆
                            </div>
                        </div>
                    </div>
                    <p className="text-white/80 text-sm">
                        "Great value for money. Only wish it came in more color options."
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/15 p-6 hover:border-white/30 hover:scale-102 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-purple-400/20 flex items-center justify-center text-amber-400">
                        A
                        </div>
                        <div>
                            <h4 className="font-medium text-white">Aadhi.</h4>
                            <div className="flex text-amber-400 text-sm"> 
                                ★★★★★
                            </div>
                        </div>
                    </div>
                    <p className="text-white/80 text-sm">
                        "Perfect! Exactly as described. Will definitely purchase again."
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/15 p-6 hover:border-white/30 hover:scale-102 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-rose-400/20 flex items-center justify-center text-amber-400">
                        M
                        </div>
                        <div>
                            <h4 className="font-medium text-white">Maria</h4>
                            <div className="flex text-amber-400 text-sm"> 
                                ★★☆☆☆
                            </div>
                        </div>
                    </div>
                    <p className="text-white/80 text-sm">
                        "Fine, That's all"
                    </p>
                </div>
                
             </div>
        </div>
       </div>
       </div>
    );
}

export default SingleProduct;