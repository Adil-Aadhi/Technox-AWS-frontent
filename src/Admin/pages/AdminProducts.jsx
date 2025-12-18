import { FiBox,FiSearch,FiBell,FiMessageSquare } from "react-icons/fi"
import { ProductContext } from "../context/productContext";
import { useContext, useState } from "react";
import { BiRupee } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { FiTrash2 } from "react-icons/fi";
import { FaPen, FaEye, FaEyeSlash,FaPlus,FaCheck  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AdminLoader from "../layout/AdminLoader";



function AdminProducts(){

    const {product,HideProduct,setAddProduct,addProduct,AddProduct,DeleteProduct,setEditProductId,EditProduct,editProductId,type,setType,brand,setBrand,page,totalPages,FetchProduct,setSearch,setSelectedProduct,selectedProduct,totalProducts,loading}=useContext(ProductContext);
    const [isModelOpen,setIsModelOpen] = useState(false);
    const [isFormOpen,setIsFormOpen]=useState(false)
    const [openFilter, setOpenFilter] = useState(false);
    const [showConfirm,setShowConfirm]=useState(false)

    const navigate=useNavigate()


    const OpenModel=(product)=>{
        setSelectedProduct(product)
        setIsModelOpen(true);
    }

    const closeModal =()=>{
        setIsModelOpen(false);
        setTimeout(()=>{
            setSelectedProduct(null);
        },300);
    }

    return(
        <div className="p-5">
            <div>
                <>
                    {loading && <AdminLoader />}
                </>
            </div>
                    <main>
                        <nav className="flex flex-wrap justify-between items-center bg-white/70 rounded-2xl p-4 sm:p-6 backdrop-blur-lg shadow-sm">
                            <div className="flex gap-2 sm:gap-3 items-center">
                                <FiBox className="text-lg sm:text-2xl" />
                                <h1 className="text-base sm:text-2xl font-bold text-gray-800">Products</h1>
                            </div>
                            <div className="flex flex-wrap md:flex-nowrap items-center gap-3 sm:gap-4 w-full md:w-auto mt-3 md:mt-0">
                                
                                <div className="relative flex-1 md:flex-none w-full md:w-64">
                                <FiSearch className="absolute left-3 top-2.5 text-gray-500" size={18} />
                                <input 
                                    type="text" 
                                    className="w-full bg-white rounded-2xl pl-10 pr-4 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all"  
                                    placeholder="Search..." 
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                </div>
                                {/* <button className="relative p-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                                <FiBell size={18} className="text-gray-600" />
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
                                </button> */}

                                <div className="flex items-center gap-2 bg-white rounded-xl pl-2 pr-3 py-1.5 border border-gray-200">
                                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                                    <span className="text-white font-semibold text-sm">A</span>
                                </div>
                                <span className="hidden sm:block text-sm font-medium text-gray-700">Admin</span>
                                </div>
                            </div>
                        </nav>

                        <div className="flex flex-col md:flex-row md:justify-between mt-5 gap-4">
                                <div>
                                    <div className="rounded-2xl text-sm bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/10 py-2 px-4 text-white cursor-pointer transition-all">
                                    <span className="text-xl text-black">Total Products : </span>
                                    <span className="text-red-400 text-xl"> {totalProducts}</span>
                                    </div>
                                    <button
                                        className=" justify-start bg-red-600 hover:bg-red-700 text-white text-md 
                                                font-small px-2 py-2 rounded-xl shadow-md 
                                                transition-all duration-200 mt-2 hover:cursor-pointer"
                                        onClick={()=>navigate('/admin/deleted-product')}>
                                        Deleted Products
                                    </button>
                                </div>
                                
                                <div className="hidden md:flex flex-wrap gap-3">
  
                                
                                    <div className="relative group">
                                    <div className="rounded-xl text-sm bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/10 py-2 px-4 text-white cursor-pointer transition-all"
                                            >
                                        <button className="text-lg text-black">{brand?brand:"All Brands"}</button>
                                    </div>
                                    
                                    <div className="absolute right-0 top-full mt-2 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 backdrop-blur-xl bg-black/10 border border-white/20 rounded-xl shadow-lg shadow-black/20 overflow-hidden z-10">
                                        <button className="w-full text-left px-4 py-3 text-black/70 hover:bg-white/20 transition-colors cursor-pointer"
                                            onClick={()=>setBrand(null)}>
                                        All Brands
                                        </button>
                                        <button className="w-full text-left px-4 py-3 text-black/70 hover:bg-white/20 transition-colors cursor-pointer"
                                            onClick={()=>setBrand("Apple")}>
                                        Apple
                                        </button>
                                        <button className="w-full text-left px-4 py-3 text-black/70 hover:bg-white/20 transition-colors cursor-pointer"
                                            onClick={()=>setBrand("Google")}>
                                        Google
                                        </button>
                                        <button className="w-full text-left px-4 py-3 text-black/70 hover:bg-white/20 transition-colors border-t border-white/10 cursor-pointer"
                                            onClick={()=>setBrand("OnePlus")}>
                                        Oneplus
                                        </button>
                                        <button className="w-full text-left px-4 py-3 text-black/70 hover:bg-white/20 transition-colors border-t border-white/10 cursor-pointer"
                                            onClick={()=>setBrand("Samsung")}>
                                        Samsung
                                        </button>
                                        <button className="w-full text-left px-4 py-3 text-black/70 hover:bg-white/20 transition-colors border-t border-white/10 cursor-pointer"
                                            onClick={()=>setBrand("Xiaomi")}>
                                        Xiaomi
                                        </button>
                                        <button className="w-full text-left px-4 py-3 text-black/70 hover:bg-white/20 transition-colors border-t border-white/10 cursor-pointer"
                                            onClick={()=>setBrand("Asus")}>
                                        Asus
                                        </button>
                                        <button className="w-full text-left px-4 py-3 text-black/70 hover:bg-white/20 transition-colors border-t border-white/10 cursor-pointer"
                                            onClick={()=>setBrand("Dell")}>
                                        Dell
                                        </button>
                                        <button className="w-full text-left px-4 py-3 text-black/70 hover:bg-white/20 transition-colors border-t border-white/10 cursor-pointer"
                                            onClick={()=>setBrand("HP")}>
                                        HP
                                        </button>
                                        <button className="w-full text-left px-4 py-3 text-black/70 hover:bg-white/20 transition-colors border-t border-white/10 cursor-pointer"
                                            onClick={()=>setBrand("Lenovo")}>
                                        Lenovo
                                        </button>
                                    </div>
                                    </div>

                                    <div className="relative group">
                                    <div className="rounded-xl text-sm bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/10 py-2 px-4 text-white cursor-pointer transition-all "
                                        >
                                        <button className="text-lg text-black">{type?type:"All Products"}</button>
                                    </div>
                                    
                                    <div className="absolute right-0 top-full mt-2 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl shadow-lg shadow-black/20 overflow-hidden z-10">
                                        <button className="w-full text-left px-4 py-3 text-black/70 hover:bg-white/20 transition-colors cursor-pointer"
                                            onClick={()=>setType(null)}>
                                        All Products
                                        </button>
                                        <button className="w-full text-left px-4 py-3 text-black/70 hover:bg-white/20 transition-colors cursor-pointer"
                                            onClick={()=>setType("Mobile")}>
                                        Mobile
                                        </button>
                                        <button className="w-full text-left px-4 py-3 text-black/70 hover:bg-white/20 transition-colors border-t border-white/10 cursor-pointer"
                                            onClick={()=>setType("Laptop")}>
                                        Laptop
                                        </button>
                                    </div>
                                    </div>
                                
                                </div>

                                    <div className="md:hidden">
                                        <button 
                                            className="px-4 py-2 rounded-xl bg-white/10 text-black backdrop-blur-md border border-white/20 shadow-md"
                                            onClick={() => setOpenFilter(true)}
                                        >
                                            Filters
                                        </button>
                                        </div>
                                        {openFilter && (
                                            <div className="fixed bg-black/50 inset-0 z-50 flex">
                                                <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={() => setOpenFilter(false)} />
                                                <div className="w-64 bg-white/20 backdrop-blur-xl h-full p-5 shadow-xl border-l border-white/30">
                                                <button 
                                                    className="mb-4 p-2 rounded-full hover:bg-white/20 transition"
                                                    onClick={() => setOpenFilter(false)}
                                                >
                                                    <IoClose className="text-white text-xl" />
                                                </button>

                                                <h3 className="text-white font-bold mb-3">Brand</h3>
                                                <div className="space-y-2 mb-5">
                                                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/20 text-white">Apple</button>
                                                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/20 text-white">Samsung</button>
                                                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/20 text-white">Google</button>
                                                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/20 text-white">OnePlus</button>
                                                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/20 text-white">Xiaomi</button>
                                                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/20 text-white">Asus</button>
                                                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/20 text-white">Dell</button>
                                                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/20 text-white">HP</button>
                                                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/20 text-white">Lenovo</button>
                                                </div>

                                                <h3 className="text-white font-bold mb-3">Type</h3>
                                                <div className="space-y-2">
                                                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/20 text-white">Mobile</button>
                                                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/20 text-white">Laptop</button>
                                                </div>
                                                </div>
                                            </div>
)}


                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-5 mt-5">
                            {product.length >0?(
                                product.map((x) => (
                                <div
                                    key={x.id}
                                    className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                                        onClick={()=>OpenModel(x)}>
                                        {Number(x.totalquantity) > 0 && Number(x.totalquantity) <= 5 && (
                                            <div className="absolute top-5 right-[-50px] w-[160px] bg-orange-500 text-white text-center text-xs font-bold transform rotate-40 shadow-md">
                                                Limited Stock
                                            </div>
                                            )}
                                            {Number(x.totalquantity) === 0 && (
                                            <div className="absolute top-5 right-[-50px] w-[160px] bg-red-600 text-white text-center text-xs font-bold transform rotate-45 shadow-md">
                                                Out of Stock
                                            </div>
                                            )}
                                    <div className="w-full h-40 overflow-hidden flex items-center justify-center bg-black/20">
                                    <img
                                        src={x?.image}
                                        alt={x?.name}
                                        className="h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                    />
                                    </div>
                                    <div className="p-3 bg-white/10 backdrop-blur-md">
                                    <h3 className="text-sm font-medium text-black truncate">{x?.name}</h3>
                                    <div className="mt-1 flex justify-between">
                                        <div>
                                            <span className="text-xs text-gray-500 mb-1 me-1">Stock</span>
                                            <span className={`rounded-2xl ${x.totalquantity==="0"?"bg-red-400":"bg-white/0"} ${x.totalquantity==="0"?"text-white":"text-black"} text-xs  p-2`}>
                                            
                                            {x.totalquantity === "0" || Number(x.totalquantity) === 0
                                                ? "Out of Stock"
                                                : x.totalquantity}
                                        </span>
                                        </div>
                                        <span className="text-green-500/70 flex items-center">
                                        <BiRupee className="inline-block mr-1" />
                                        {x?.price}
                                        </span>
                                        <span className={`rounded-2xl ${x.status==="hidden"?"bg-red-400":"bg-green-400"} text-xs text-white p-2`}>
                                        {x?.status==="hidden"?"Not available":"Available"}
                                        </span>
                                    </div>
                                    </div>
                                </div>
                            ))
                            ):(
                                <div className="col-span-full text-center text-gray-400 py-10">
                                <p>{`No ${type || ""}s in ${brand || ""} brand are not available`.trim() || "No products found"}</p>
                            </div>
                            )
                            }
                        </div>


                        <div className="flex items-center justify-center gap-2 mt-4">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                key={i}
                                onClick={() => FetchProduct(i + 1)}
                                className={`px-3 py-1 rounded ${
                                    page === i + 1 ? "bg-black/70 text-white" : "bg-gray-200"
                                }`}
                                >
                                {i + 1}
                                </button>
                            ))}

                        </div>


                        {selectedProduct && (
                                            <div className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-all duration-300 ${isModelOpen ? 'backdrop-blur-sm opacity-100' : 'backdrop-blur-0 opacity-0'}`} >
                                                <div  className={`relative max-w-full sm:max-w-4xl w-full mx-2 sm:mx-0 bg-white/30 border border-white/20 rounded-2xl overflow-hidden backdrop-blur-lg transition-all duration-300 transform ${isModelOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                                                    <button  onClick={closeModal}  className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-1 sm:p-2 rounded-full bg-black/20 hover:bg-white/20 transition-colors cursor-pointer">
                                                        <IoClose className="h-4 w-4 sm:h-5 sm:w-5 text-white hover:text-red-400" />
                                                    </button>
                                                    <div className="flex flex-col md:flex-row ">
                                                        <div className="md:w-1/2 p-3 sm:p-6 flex flex-col items-center justify-center">
                                                            <img src={selectedProduct.image} alt={selectedProduct.name}
                                                                className="w-full h-auto max-h-[200px] sm:max-h-[400px] object-contain rounded-lg transition-transform duration-500 hover:scale-105"/>
                                                            <div className="flex gap-3 mt-4 ">
                                                                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition cursor-pointer"
                                                                        onClick={()=>setShowConfirm(true)}>
                                                                    <FiTrash2 className="text-xl"/>
                                                                </button>
                                                                 <button className="bg-blue-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition cursor-pointer"
                                                                            onClick={() => {
                                                                                    setAddProduct({
                                                                                        ...selectedProduct,image: null,}); 
                                                                                    setEditProductId(selectedProduct.id);
                                                                                    setIsFormOpen(true);
                                                                                    closeModal()}}>
                                                                    <FaPen />
                                                                </button>
                                                                <button className="bg-black/50 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition cursor-pointer"
                                                                    onClick={()=>{HideProduct(selectedProduct);
                                                                    }}>
                                                                    {selectedProduct?.status=="active"?<FaEyeSlash  className="text-xl" />:<FaEye className="text-xl"/>}
                                                                </button>
                                                            </div>
                                                        </div>
                                                            <div className="md:w-1/2 p-3 sm:p-6 text-dark">
                                                                <h2 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">{selectedProduct.name}</h2>
                                                                    <div className="text-base sm:text-xl mb-2 sm:mb-4">
                                                                        <BiRupee className="inline-block mr-1" />{selectedProduct.price}
                                                                    </div>
                                                                <p className="text-black text-sm sm:text-base mb-4 sm:mb-10 font-medium">{selectedProduct.description || "Product description goes here."}
                                                                </p>
                                                                <div className="overflow-x-auto">
                                                                     <table className="w-full max-w-md border-collapse text-sm sm:text-base text-white bg-black/20 rounded-2xl ">
                                                                        <tbody>
                                                                            <tr className='border-b border-white/30'>
                                                                                <th className='py-3 px-4 text-left font-medium bg-white/10'>Brand</th>
                                                                                <td className='py-3 px-4'>{selectedProduct.brand}</td>
                                                                            </tr>
                                                                            <tr className='border-b border-white/30'>
                                                                                <th className='py-3 px-4 text-left font-medium bg-white/10'>Storage</th>
                                                                                <td className='py-3 px-4'>{selectedProduct.storage}</td>
                                                                            </tr>
                                                                            <tr className='border-b border-white/30'>
                                                                                <th className='py-3 px-4 text-left font-medium bg-white/10'>Ram</th>
                                                                                <td className='py-3 px-4'>{selectedProduct.ram}</td>
                                                                            </tr>
                                                                            <tr className='border-b border-white/30'>
                                                                                <th className='py-3 px-4 text-left font-medium bg-white/10'>CPU</th>
                                                                                <td className='py-3 px-4'>{selectedProduct.cpu}</td>
                                                                            </tr>
                                                                            <tr className='border-b border-white/30'>
                                                                                <th className='py-3 px-4 text-left font-medium bg-white/10 rounded-br-xl rounded-bl-xl'>Display</th>
                                                                                <td className='py-3 px-4'>{selectedProduct.display}</td>
                                                                            </tr>
                                                                            <tr className='border-b border-white/30'>
                                                                                <th className='py-3 px-4 text-left font-medium bg-white/10 rounded-br-xl rounded-bl-xl'>Stock</th>
                                                                                <td className='py-3 px-4'>{selectedProduct.totalquantity}</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                    </div>
                                                </div>
                                            </div>
                        )}

                        {showConfirm && (
                                  <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                                    <div className="bg-white/20 backdrop-blur-xl p-6 rounded-2xl shadow-xl">
                                      <p className="text-white">Are you sure you want to Delete?</p>
                                      <div className="flex justify-between gap-4 mt-4">
                                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer hover:scale-102 transition-all duration-200 ease-in-out"
                                                onClick={()=>{setShowConfirm(false);
                                                                DeleteProduct(selectedProduct);
                                                                closeModal()

                                                }}
                                        >Yes</button>
                                        <button className="px-4 py-2 bg-gray-400 rounded-lg cursor-pointer hover:scale-102 transition-all duration-200 ease-in-out" onClick={()=>setShowConfirm(false)} >No</button>
                                      </div>
                                    </div>
                                  </div>
                                )}

                        {isFormOpen && (
                            <div className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-all duration-300 ${isFormOpen ? 'backdrop-blur-sm opacity-100' : 'backdrop-blur-0 opacity-0'}`}>
                                <div className="bg-black/80 backdrop-filter backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl w-full max-w-4xl">
                                <div className="mb-6 relative flex items-center justify-between">
                                    <div>
                                    <h2 className="text-2xl font-bold text-white">Add New Product</h2>
                                    <p className="text-white/70 mt-1">Enter product details below</p>
                                    </div>
                                    <button className="p-2 rounded-full hover:bg-white/20 transition" onClick={() => setIsFormOpen(false)}>
                                    <IoClose className="text-white text-xl cursor-pointer hover:text-red-400" />
                                    </button>
                                </div>
                                
                                <form className="max-h-[70vh] overflow-y-auto pr-2 scrollbar-hide" onSubmit={(e)=>{
                                                                                            e.preventDefault();
                                                                                            if(editProductId){
                                                                                                EditProduct()
                                                                                            }else{
                                                                                                AddProduct()
                                                                                            }
                                                                                            
                                                                                            setIsFormOpen(false)}}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <div>
                                        <label className="block text-white/80 text-sm font-medium mb-1">Name *</label>
                                        <input 
                                            className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
                                            placeholder="Product Name" onChange={(e) => setAddProduct({...addProduct, name: e.target.value})} value={addProduct.name} required
                                        />
                                        </div>
                                        
                                        <div>
                                        <label className="block text-white/80 text-sm font-medium mb-1">Brand *</label>
                                        <input 
                                            className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
                                            placeholder="Brand Name"  onChange={(e) => setAddProduct({...addProduct, brand: e.target.value})} value={addProduct.brand} required
                                        />
                                        </div>
                                        
                                        <div>
                                        <label className="block text-white/80 text-sm font-medium mb-1">Price *</label>
                                        <div className="relative">
                                            <input 
                                            className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-7 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
                                            placeholder="Brand Price"  onChange={(e) => setAddProduct({...addProduct, price: e.target.value})} value={addProduct.price} required
                                            type="number"
                                            />
                                        </div>
                                        </div>
                                        
                                        <div>
                                        <label className="block text-white/80 text-sm font-medium mb-1">Product Type *</label>
                                        <select className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition appearance-none"
                                                onChange={(e) => setAddProduct({ ...addProduct, type: e.target.value })} value={addProduct.type}>
                                            <option value="" className="bg-gray-900">Select Type</option>
                                            <option value="Mobile" className="bg-gray-900">Mobile</option>
                                            <option value="Laptop" className="bg-gray-900">Laptop</option>
                                        </select>
                                        </div>
                                        
                                        <div>
                                        <label className="block text-white/80 text-sm font-medium mb-1">Storage</label>
                                        <select className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition appearance-none"
                                                onChange={(e) => setAddProduct({ ...addProduct, storage: e.target.value })} value={addProduct.storage}>
                                            <option value="" className="bg-gray-900">Select Storage</option>
                                            <option value="128gb" className="bg-gray-900">128GB</option>
                                            <option value="256gb" className="bg-gray-900">256GB</option>
                                            <option value="512gb" className="bg-gray-900">512GB</option>
                                            <option value="1tb" className="bg-gray-900">1TB</option>
                                        </select>
                                        </div>
                                        
                                        <div>
                                        <label className="block text-white/80 text-sm font-medium mb-1">RAM</label>
                                        <select className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition appearance-none"
                                                onChange={(e) => setAddProduct({ ...addProduct, ram: e.target.value })} value={addProduct.ram}>
                                            <option value="" className="bg-gray-900">Select RAM</option>
                                            <option value="4" className="bg-gray-900">4GB</option>
                                            <option value="8" className="bg-gray-900">8GB</option>
                                            <option value="12" className="bg-gray-900">12GB</option>
                                            <option value="16" className="bg-gray-900">16GB</option>
                                            <option value="24" className="bg-gray-900">24GB</option>
                                        </select>
                                        </div>
                                    </div>
                                    

                                    <div className="space-y-4">
                                        <div>
                                        <label className="block text-white/80 text-sm font-medium mb-1">Color</label>
                                        <input 
                                            className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
                                            placeholder="Product Color" onChange={(e) => setAddProduct({ ...addProduct, color: e.target.value })} value={addProduct.color} required
                                        />
                                        </div>
                                        
                                        <div>
                                        <label className="block text-white/80 text-sm font-medium mb-1">Image *</label>
                                        <input 
                                            type="file"
                                            accept="image/*"
                                            className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
                                            placeholder="Product Image" onChange={(e) => setAddProduct({ ...addProduct, image: e.target.files[0] })}
                                        />
                                        </div>
                                        
                                        <div>
                                        <label className="block text-white/80 text-sm font-medium mb-1">Display</label>
                                        <input 
                                            className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
                                            placeholder="Display Specifications" onChange={(e) => setAddProduct({ ...addProduct, display: e.target.value })} value={addProduct.display} required
                                        />
                                        </div>
                                        
                                        <div>
                                        <label className="block text-white/80 text-sm font-medium mb-1">CPU</label>
                                        <input 
                                            className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
                                            placeholder="Processor Details" onChange={(e) => setAddProduct({ ...addProduct, cpu: e.target.value })} value={addProduct.cpu} required
                                        />
                                        </div>
                                        
                                        <div>
                                        <label className="block text-white/80 text-sm font-medium mb-1">Description</label>
                                        <textarea 
                                            className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
                                            placeholder="Product description and features..." onChange={(e) => setAddProduct({ ...addProduct, description: e.target.value })} value={addProduct.description} required
                                            rows="3"
                                        />
                                        </div>
                                        
                                        <div>
                                        <label className="block text-white/80 text-sm font-medium mb-1">Total Quantity *</label>
                                        <input 
                                            className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
                                            placeholder="0" onChange={(e) => setAddProduct({ ...addProduct, totalquantity: Number(e.target.value) })} value={addProduct.totalquantity}
                                            type="number"
                                        />
                                        </div>
                                    </div>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-4 border-t border-white/10">
                                    <button 
                                        type="button" 
                                        className="flex-1 bg-transparent hover:bg-white/10 text-white py-3 rounded-lg transition-colors border border-white/20 cursor-pointer"
                                        onClick={() => setIsFormOpen(false)}>
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors cursor-pointer shadow-lg">
                                        <FaCheck className="text-lg" />
                                        {editProductId?"Update Product":"Add Product"}
                                    </button>
                                    </div>
                                </form>
                                </div>
                            </div>
                            )}
                        <button 
                                className="fixed bottom-8 right-8 bg-black/20 hover:bg-black/50 text-white p-4 rounded-full shadow-lg transition-all duration-300 cursor-pointer"
                                            onClick={()=>setIsFormOpen(true)}>
                                <FaPlus className="text-xl" />
                        </button>
                    </main>
        </div>
    )
}

export default AdminProducts