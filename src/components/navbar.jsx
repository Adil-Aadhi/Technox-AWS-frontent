import {Link} from 'react-router-dom'
import { FiSearch, FiShoppingCart, FiUser, FiMenu } from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState,useContext } from 'react';
import useWishList from './customhook/customehook';
import useHandleCart from './customhook/carthook';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FiBox } from 'react-icons/fi';
import { CartContext } from './useContext/cartwishContext';
import api from '../../axiosConfig';


function Navbar(){

const userData = JSON.parse(localStorage.getItem('user'));

const {cartLength,setCartLength,wishLength,setWishLength}=useContext(CartContext)


const navigate=useNavigate();

const [msg,setMsg]=useState(false)
const [mobSearch,setMobSearch]=useState(false)
const [showMenu, setShowMenu] = useState(false)
const [searchQuery,setSearchQuery] =useState('')
const [searchResults,setSearchResults] =useState([])
const [showResults,setShowResults] =useState(false)



const SearchProduct=(query)=>{
    if (query.trim()===""){
        setSearchResults([])
        return
    }

    api.get(`/api/products/search/?q=${query}`)
       .then(res=>setSearchResults(res.data))
       .catch(err=>console.log('search error',err))
}

const HandleSearch=(e)=>{
    const value=e.target.value;
    setSearchQuery(value)
    setShowResults(value.trim()!=="")
}


const handleResultClick=(id)=>{
    navigate(`/products/${id}`)
}

useEffect(()=>{
    SearchProduct(searchQuery);
},[searchQuery])




 
    return(
       <nav className='fixed top-0 w-full z-[100] bg-gray-900/80 backdrop-blur-md border-b border-white/50 p-3'>
            <div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className='flex flex-col gap-1'>
                    <div className="flex items-center  gap-4 sm:gap-6 justify-between">
                        <div className='flex items-center gap-4'>
                            <div className="sm:hidden relative">
                                <button onClick={()=> setShowMenu(!showMenu)} className='text-white p-1'>
                                    <FiMenu className="text-xl transition duration-300 hover:scale-110"/>
                                </button>
                                {showMenu && (
                                    <div className='absolute left-0 mt-2 w-36 bg-black/20 backdrop-blur-xl border-2 border-white/25 rounded-xl shadow-2xl z-[9999] overflow-hidden text-start'>
                                        <span className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/0 opacity-0 
                                                            group-hover:opacity-100 transition-opacity duration-300"></span>
                                        {userData?.isLoggedIn ?(
                                        <button
                                                onClick={()=>{setShowMenu(false);
                                                        localStorage.removeItem('currentUser');
                                                        setCartLength(0);
                                                        setWishLength(0);
                                                        toast.info("Log-out successfully")
                                                        navigate('/login')
                                                }} 
                                                className='relative z-10 w-full text-start block px-4 py-3 text-sm text-white font-medium hover:text-black
                                                        border-b border-white/15 transition-all duration-200 hover:bg-white/15 hover:pl-4 cursor-pointer'>
                                            LogOut
                                        </button>
                                        ):(<>
                                        <Link to="/login" onClick={()=>setShowMenu(false)} className='relative z-10 block px-4 py-3 text-sm text-white font-medium hover:text-black
                                                        border-b border-white/15 transition-all duration-200 hover:bg-white/15 hover:pl-4'>
                                            Login
                                        </Link>
                                        <Link to="/register" onClick={()=>setShowMenu(false)} className='relative z-10 block px-4 py-3 text-sm text-white font-medium hover:text-black
                                                        border-b border-white/15 transition-all duration-200 hover:bg-white/15 hover:pl-4'>
                                            SignUp
                                        </Link>
                                        </>)}
                                        
                                        <Link to="/products" onClick={()=>setShowMenu(false)} className='relative z-10 block px-4 py-3 text-sm text-white font-medium hover:text-black
                                                        border-b border-white/15 transition-all duration-200 hover:bg-white/15 hover:pl-4'>
                                            Products
                                        </Link>
                                        <Link to="/about" onClick={()=>setShowMenu(false)} className='relative z-10 block px-4 py-3 text-sm text-white font-medium hover:text-black
                                                        border-b border-white/15 transition-all duration-200 hover:bg-white/15 hover:pl-4'>
                                            About
                                        </Link>
                                    </div>
                                )}
                            </div>
                            {/* <div className="flex-shrink-0">
                            <Link to="/" className="text-white text-2xl font-bold">Techno<span style={{color:"red"}}>X</span></Link>
                        </div> */}
                            <div className="flex-shrink-0 flex items-center">
                                <Link to="/"><img src="/logo1.png" className='w-10 h-10 md:w-14 md:h-12 hover:opacity-80 transition-opacity' alt="Company Logo"></img></Link>
                            </div>
                        </div>
                        
                        <div className='w-120'>
                        <input style={{color:"white",borderRadius:"10px",padding:"5px"}} type="text" placeholder=' search...' 
                                     className="hidden sm:flex flex-shrink w-full max-w-xs sm:max-w-[200px] md:max-w-[320px] lg:max-w-[480px] 
                                    bg-white/20 outline-none transition duration-300 hover:scale-102 text-white px-2 py-1"
                                     value={searchQuery} onChange={(HandleSearch)} onFocus={() => setShowResults(searchQuery.trim()!=="")} onBlur={() => setTimeout(() => setShowResults(false), 300)}>
                            </input>

                            {showResults && searchResults.length>0 &&(
                                <div className="hidden sm:block absolute top-full mt-1 
                                                bg-gray-800/90 backdrop-blur-lg border border-white/20 
                                                rounded-lg shadow-xl z-[9999] max-h-80 overflow-y-auto 
                                                w-full sm:w-[320px] lg:w-[480px] hide-scrollbar">
                                    {searchResults.map((product)=>(
                                        <div key={product.id} onClick={()=>handleResultClick(product.id)}
                                            className="block px-4 py-3 text-white hover:bg-white/10 transition duration-200 border-b border-white/10 last:border-b-0">
                                            <div className='font-medium'>{product.name}</div>
                                                 <img src={product.image} className='w-15'></img>
                                        </div>
                                    ))}
                                </div>    
                            )}
                            </div>
                        
                        <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 backdrop-blur-lg bg-white/10 border border-white/20 rounded-lg px-3 py-1 ">
                            <div className='relative hidden sm:block '>
                            <div className='relative group overflow-hidden hover:bg-white/10 transition-all duration-300 rounded-md px-5 py-1 flex items-center gap-2 text-white hover:text-orange-300 hover:scale-102'>
                            <FiBox className="text-white text-lg cursor-pointer"/>
                            <Link to="/products" >Products</Link>
                             <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent 
                                            opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>

                            
                            </div>
                            <button className="sm:hidden text-white text-xl p-2 hover:scale-110 transition duration-300" onClick={()=>{
                                setMobSearch((!mobSearch))}}aria-label="Toggle Search Bar">
                                <FiSearch/>
                            </button>
                            <Link to="/cart" className="text-white p-1 relative"> <FiShoppingCart className="text-white text-xl transition duration-300  hover:scale-110 hover:text-orange-400" />
                                {cartLength>0 && ( <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs  rounded-full h-3 w-3 flex items-center justify-center">
                                    {cartLength>9?"9+":cartLength}
                                </span>)}
                            </Link>
                            <button onClick={()=>{
                                                 if (!userData?.isLoggedIn) {
                                                toast.warning("Please login first!");
                                                return;
                                                }
                                                navigate("/wishlist");
                            }} className="text-white p-1 relative cursor-pointer"><FaHeart  className="text-white text-xl transition duration-300  hover:scale-110 hover:fill-red-400 " />
                                    {wishLength>0 && (<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs  rounded-full h-3 w-3 flex items-center justify-center">{wishLength>9?"9+":wishLength}</span>)} </button>
                            <div  className="relative group z-[200]" onMouseEnter={()=>setMsg(true)} onMouseLeave={()=>setMsg(false)}>
                                <button onClick={()=>navigate('/profile')} className='cursor-pointer'>
                                    <FiUser className="text-white text-xl transition duration-300  hover:scale-110 hover:text-blue-400" />
                                </button>
                                {msg && (
                                        <div className="absolute right-0  w-32 bg-white/10 backdrop-blur-xl border-2 border-white/25 rounded-xl shadow-2xl
                                                        opacity-0 translate-y-1 pointer-events-none
                                                        group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0
                                                        transition-all duration-300 ease-out z-[9999] overflow-hidden">
                                            
                                            <span className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/0 opacity-0 
                                                            group-hover:opacity-100 transition-opacity duration-300"></span>

                                            {userData?.isLoggedIn ? (
                                                <>
                                                    <button onClick={async () => {
                                            

                                            await api.post('/api/logout/', {}, { withCredentials: true });


                                            localStorage.removeItem('user');
                                            localStorage.removeItem('access');


                                            setCartLength(0);
                                            setWishLength(0);

                                            setTimeout(() => {
                                                toast.info("Log-out successfully");
                                                navigate("/login");
                                            }, 100);
                                        }} className="relative z-10 block w-full text-left px-4 py-3 text-sm text-white font-medium hover:text-black
                                                                border-b border-white/15 transition-all duration-200 hover:bg-white/15 hover:pl-4 cursor-pointer">
                                                                    Logout
                                                    </button>
                                                </>
                                                ) : ( 
                                                <>
                                                     <Link 
                                            to="/login" 
                                            className="relative z-10 block px-4 py-3 text-sm text-white font-medium hover:text-black
                                                        border-b border-white/15 transition-all duration-200 hover:bg-white/15 hover:pl-4"
                                            >
                                            Login
                                            </Link>
                                            <Link 
                                            to="/register"  
                                            className="relative z-10 block px-4 py-3 text-sm text-white font-medium hover:text-black
                                                        transition-all duration-200 hover:bg-white/15 hover:pl-4"
                                            >
                                            Signup
                                            </Link>
                                                </>
                                            )}
                                        </div>
                                        )}
                            </div>
                        </div>
                        </div>
                        {mobSearch &&(
                            <div className="sm:hidden relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-3 py-2 mt-8 mx-3 transition-all duration-300 z-10">
                                <input type="text" className="w-full bg-transparent outline-none" placeholder='search....' style={{ color: "white", borderRadius: "10px", padding: "5px" }}
                                        value={searchQuery} onChange={HandleSearch} onFocus={() => setShowResults(searchQuery.trim() !== "")}>
                                </input>
                                {showResults && searchResults.length>0 && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800/90 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl z-[9999] max-h-80 overflow-y-auto">
                                        {searchResults.map((product)=>(
                                            <div key={product.id}  onClick={()=>handleResultClick(product.id)}
                                                    className="block px-4 py-3 text-white hover:bg-white/10 transition duration-200 border-b border-white/10 last:border-b-0">
                                                <div className="font-medium">{product.name}</div>
                                                <img src={product.image} className='w-15'></img>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div> 
                </div>
            </div>
       </nav>
    )
}

export default Navbar