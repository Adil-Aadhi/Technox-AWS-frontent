import { useEffect, useState } from "react";
import { BiRupee } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { IoClose } from 'react-icons/io5';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import useWishList from "./customhook/customehook";
import useHandleCart from "./customhook/carthook";
import api from "../../axiosConfig";
import ProductSkeleton from "./ProductPageSkeleton";



function HomeProducts(){

    const {wishlist,ToggleWishList}=useWishList()
    const {cartList,ToggleCart,DeleteCart,HandleCarts}=useHandleCart()

    const [loading, setLoading] = useState(true);
    const [products,setProducts]=useState([]);
    const [selectedProduct,setSelectedProduct]=useState(null)
    const [isModelOpen,setIsModelOpen] = useState(false);
    
    const navigate=useNavigate();

    const HandleProducts= async ()=>{
        setLoading(true)
        try{
            const res= await api.get('/api/products/home/')
            setProducts(res.data)
            setTimeout(() => setLoading(false), 600);
        }
        catch(error){
            console.log("Error on fecthing product:",error);
        }
    }

    const openModal=(product)=>{
        setSelectedProduct(product);
        setIsModelOpen(true);
    }

    const closeModal =()=>{
        setIsModelOpen(false);
        setTimeout(()=>{
            setSelectedProduct(null);
        },300);
    }


    const HandleCart=()=>{
        navigate('/cart')
    }

  

    useEffect(()=>{
        HandleProducts();
    },[])

    return(
        <div className="relative">
             <div className={`container mx-auto px-4 py-12 transition-all duration-300 ${isModelOpen ? 'blur-sm scale-95' : 'blur-0 scale-100'}`}>
            <div>
                <h2 className="text-3xl font-bold text-white mb-4">Featured Products</h2>
            </div>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 mt-9">
                    {loading ? (
                         [...Array(10)].map((_, i) => (
                            <ProductSkeleton key={i} />
                            ))
                    ):
                    products.map((product)=>(
                        <div key={product.id} onClick={()=>openModal(product)}
                         className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden
                                                            shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                                                                {Number(product.totalquantity) > 0 && Number(product.totalquantity) <= 5 && (
                                            <div className="absolute top-5 right-[-50px] w-[160px] bg-orange-500 text-white text-center text-xs font-bold transform rotate-40 shadow-md">
                                                Limited Stock
                                            </div>
                                            )}
                                            {Number(product.totalquantity) === 0 && (
                                            <div className="absolute top-5 right-[-50px] w-[160px] bg-red-600 text-white text-center text-xs font-bold transform rotate-45 shadow-md">
                                                Out of Stock
                                            </div>
                                            )}
                        <div className="aspect-square overflow-hidden">
                            <img src ={product.image} alt={product.name}  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-white truncate" >{product.name}</h3>
                               <div className="pb-3 mt-1">
                                                {product.status==="hidden" ?(
                                                    <span className="text-red-500 bg-white/50 rounded-2xl px-2 py-1 text-xs">Not Available</span>
                                            ):(<span className="text-white/80"><BiRupee className="inline-block mr-1" />{product.price}</span>)}
                                                
                                            </div>
                        </div>
                        </div>
                    ))}
             </div>
        </div> 

                    {/* Chat GPT */}

        {selectedProduct && (
            <div className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-all duration-300 ${isModelOpen ? 'backdrop-blur-sm opacity-100' : 'backdrop-blur-0 opacity-0'}`} >
                <div  className={`relative max-w-full sm:max-w-4xl w-full mx-2 sm:mx-0 bg-black/40 border text-white border-white/20 rounded-2xl overflow-hidden backdrop-blur-lg transition-all duration-300 transform ${isModelOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                <button onClick={closeModal}  className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-1 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                    <IoClose className="h-4 w-4 sm:h-5 sm:w-5 text-white hover:text-red-400" />
                </button>
                <div className="flex flex-col md:flex-row bg-white/10">
                     <div className="md:w-1/2 p-3 sm:p-6 flex items-center justify-center relative">
                     {Number(selectedProduct.totalquantity) > 0 && Number(selectedProduct.totalquantity) <= 5 && (
                        <div className="absolute top-6 right-[-50px] w-[160px] bg-orange-500 text-white text-center text-xs font-bold transform rotate-45 rounded shadow-md">
                            Limited Stock
                        </div>
                        )}
                        {Number(selectedProduct.totalquantity) === 0 && (
                        <div className="absolute top-5 right-[-50px] w-[160px] bg-red-600 text-white text-center text-xs font-bold transform rotate-45 shadow-md">
                            Out of Stock
                        </div>
                        )}
                     <img src={selectedProduct.image} alt={selectedProduct.name}
                        className="w-full h-auto max-h-[200px] sm:max-h-[400px] object-contain rounded-lg transition-transform duration-500 hover:scale-105"/>
                     </div>
                     <div className="md:w-1/2 p-6 text-dark">
                         <h2 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">{selectedProduct.name}</h2>
                         <div className="text-base sm:text-xl mb-2 sm:mb-4">
                            <BiRupee className="inline-block mr-1" />{selectedProduct.price}
                         </div>
                          <p className="text-white/70 text-sm sm:text-base mb-4 sm:mb-20 font-medium">{selectedProduct.description || "Product description goes here."}
                          </p>
                          {selectedProduct.status==="active" && Number(selectedProduct.totalquantity) > 0 ?(
                            <div className="flex gap-2 sm:gap-4 justify-center">
                           <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-6 py-1 sm:py-2 rounded-lg text-xs sm:text-sm transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 w-20 sm:w-30 cursor-pointer"
                                     onClick={()=>{
                                                    closeModal();
                                                     setTimeout(() => {
                                                        navigate(`/products/${selectedProduct.id}`);
                                                        }, 1000);    
                                                }}>
                            <span className="text-sm">Learn more</span>
                           </button>
                           <button  className="bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-xl shadow-2xl h-12 w-20
                                    transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-white/30
                                    text-white font-medium text-sm md:text-base overflow-hidden group cursor-pointer"
                                    onClick={()=>ToggleWishList(selectedProduct)}>
                                        <span className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/0 opacity-0 
                                        group-hover:opacity-100 transition-opacity duration-300">
                                        </span>
                                         <span className="relative z-10 flex items-center justify-center">
                                            <FaHeart className={`text-white text-xl transition duration-300  hover:scale-110 ${wishlist.some(item=>item.product.id===selectedProduct.id)?'text-red-500 fill-red-500': 'text-white'}`}/>
                                         </span>
                                    
                            </button>
                           <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg  transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 w-18 cursor-pointer"
                                    onClick={()=>{closeModal();
                                    ToggleCart(selectedProduct);
                                    }}>
                            <FiShoppingCart className="text-white text-xl transition duration-300  hover:scale-110"/>
                           </button>
                           </div>
                          ):(
                             <button className="bg-red-600 text-white px-3 sm:px-6 py-1 sm:py-2 rounded-lg text-xs sm:text-sm transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 w-20 sm:w-35 cursor-pointer">
                                            <span className="text-sm">Not Available</span>
                                        </button>
                          )}
                          
                     </div>
                </div>
            </div>
            </div>
        )}

        </div>
    )
}

export default HomeProducts