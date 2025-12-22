import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { IoClose } from 'react-icons/io5';
import openRazorpay from "../utils/openRazorpay";
import api from "../../axiosConfig";



function Payment() {
    const [payment,setPayment]=useState("razorpay")
    const confession=payment==="COD"?7:0;
    const shipping=70
    const navigate=useNavigate();
    const location = useLocation();
    const [deliver,setDeliver]=useState(false)
    const [address,setAddress]=useState({
                                            house_no: "",
                                            landmark: "",
                                            town: "",
                                            district: "",
                                            post: "",
                                            mobile: ""
                                            });
    const [msg,setMsg]=useState('')


    const userData=JSON.parse(localStorage.getItem('user'))

    
  const [addressId,setAddressId]=useState('')
  
  const product = location.state?.product || null;
  const GrandTotal=location.state?.GrandTotal ?? 0;
  const products = location.state?.products || [];

  const originalPrice = product ? product.price : 0;
  const discountedPrice = product ? (originalPrice - Math.round(originalPrice * 0.05)) : 0;

  const baseAmount=GrandTotal>0 ? GrandTotal:discountedPrice

  const TotalAmount=baseAmount + shipping + confession;

  const [isDetails,setIsDetails]=useState(false)

  const [loading,setLoading]=useState(false)

 
  


  const HandleDetails=async()=>{
    try{
        const res=await api.get(`/api/user/address/`)
        setAddress(res.data ||  {
      house_no: "",
      landmark: "",
      town: "",
      district: "",
      post: "",
      mobile: ""});
      setAddressId(res.data?.id)
    }
    catch(e){
        setMsg("Error on fetching address");
        console.error(e);
    }
    
  }


  const isAddressValid = () => {
  return address.house_no && address.town && address.district && address.post && address.mobile;
}

const HandleSubmit=(e)=>{
        e.preventDefault();
        const data = { ...address };
        delete data.user;


        api.patch(`/api/user/address/`,data)
        .then((res)=>{toast.success("Address is updated");
             setIsDetails(false);
    })
        .catch((e)=>{console.log("error",e);
            toast.error("Error saving address")})
    }




    const HandleData=(e)=>{
        setAddress({...address,[e.target.name]:e.target.value})
    }


    const finalProducts = product
        ? [{ ...product, quantity: 1 }]   // single → array
        : products.map(item => ({
                        ...item.product,           // ✅ real product object
                        quantity: item.quantity,   // ✅ quantity from cart
                        }));


    const createOrder = async () => {
        const payload = {
            date: new Date().toISOString(),
            address_id: addressId,
            amount: TotalAmount,
            payment_method: payment.toUpperCase(),
            items: finalProducts.map(p => ({
                product_id: p.id,
                quantity: p.quantity || 1,
            }))
        };

            const res = await api.post("/api/order/", payload);
            return res.data.order_id;
        };

        const handleCOD = async () => {
                try {
                    setLoading(true)
                    const orderId = await createOrder();
                    setDeliver(true);
                    clearOrderedItemsFromCart(finalProducts);
                    setTimeout(() => {
                        navigate("/");
                        setDeliver(false);
                        toast.success("Order Placed Successfully!");
                        setLoading(false)
                    }, 2500); 
                }catch (e) {
                            setDeliver(false);
                            setLoading(false)

                            let message = "Something went wrong";

                            if (e?.response?.data) {
                                if (typeof e.response.data === "string") {
                                    message = e.response.data;
                                } 
                                else if (Array.isArray(e.response.data.non_field_errors)) {
                                    message = e.response.data.non_field_errors[0];
                                } 
                                else {
                                    const firstKey = Object.keys(e.response.data)[0];
                                    const value = e.response.data[firstKey];
                                    message = Array.isArray(value) ? value[0] : value;
                                }
                            }

                            toast.error(message, {style: {color: "black",background: "#fff",}});
                }
            };


            const handleRazorpay = async () => {
                try {
                    setLoading(true)
                    const orderId = await createOrder();   // ✅ create unpaid order
                    await openRazorpay(orderId);           // ✅ payment
                    clearOrderedItemsFromCart(finalProducts);
                    toast.success("Payment Successful!");
                    setLoading(false)
                    navigate("/");
                } catch {
                    toast.error("Payment failed or cancelled",{style: {color: "black",background: "#fff",}});
                    setLoading(false)
                }
            };

   
    const clearOrderedItemsFromCart = async (orderedProducts) => {
    const productIds = orderedProducts.map(p => p.id)

    await api.post("/api/user/cart/clear-cart/", {
        product_ids: productIds
    })
}
    

  useEffect(()=>{
    HandleDetails();
  },[])



    return (
        <div className="bg-gradient-to-br from-blue-50 to-teal-50 min-h-screen p-6">

        {/* gpt  */}
            {loading &&  (
                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-8 flex flex-col items-center">
                        <div className="relative w-20 h-20 mb-4">
                            <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-white/50 animate-spin"></div>
                            <div className="absolute inset-2 rounded-full border-4 border-b-transparent border-white/30 animate-spin animation-delay-200"></div>
                            <div className="absolute inset-4 rounded-full border-4 border-l-transparent border-white/10 animate-spin animation-delay-400"></div>
                        </div>
                        <p className="text-white text-md font-medium">Loading...</p>
                    </div>
                </div>
            )}
            {deliver && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                          <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-8 flex flex-col items-center">
                            <div className="relative w-20 h-20 mb-4">
                              <div className="absolute inset-0 rounded-full border-4 border-green-400/50 animate-spin"></div>
                              <svg 
                                className="checkmark animate-draw" 
                                viewBox="0 0 52 52"
                                style={{
                                  width: '80px',
                                  height: '80px',
                                  opacity: 0,
                                  animation: 'fadeIn 0.5s ease-in-out 1s forwards'
                                }}
                              >
                                <circle 
                                  className="checkmark-circle" 
                                  cx="26" 
                                  cy="26" 
                                  r="25" 
                                  fill="none"
                                  stroke="rgba(74, 222, 128, 0.3)"
                                  strokeWidth="4"
                                />
                                <path 
                                  className="checkmark-check" 
                                  fill="none" 
                                  stroke="rgba(74, 222, 128, 0.8)" 
                                  strokeWidth="4" 
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeDasharray="48"
                                  strokeDashoffset="48"
                                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                                  style={{ animation: 'dash 0.5s ease-in-out 0.5s forwards' }}
                                />
                              </svg>
                            </div>
                            <p className="text-white text-md font-medium">Order Placed Successfully!</p>
                          </div>
                        </div>
                      )}




            <div className="max-w-7xl mx-auto mt-20">
                <div className="relative flex justify-center ">
                    <h1 className=" text-xl sm:text-3xl font-bold text-gray-800 mb-15">Complete Your Payment</h1>
                <div className="bg-red-400">
                    <button  className="absolute top-0 right-0 sm:top-0 sm:right-2  z-10 p-0 sm:p-2 rounded-full bg-white hover:bg-orange-200 transition-colors text-red-500 cursor-pointer"
                                onClick={()=>navigate(-1)}>
                                        <IoClose className="h-4 w-4 sm:h-5 sm:w-5 text-red-700 " />
                                    </button>
                </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:scale-102 transition-all duration-200 ease-in-out">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipping Information</h2>
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-black/80">
                                <h3 className="font-medium text-gray-700 mb-2">Current Address</h3>
                                    <div>
                                        <span>House No:</span>
                                        <span className="ms-2 text-black/50">{address?.house_no || "not provided"}</span>
                                    </div>
                                    <div>
                                        <span>Landmark:</span>
                                        <span className="ms-2 text-black/50">{address?.landmark || "not provided"}</span>
                                    </div>
                                    <div>
                                        <span>Town/City:</span>
                                        <span className="ms-2 text-black/50">{address?.town || "not provided"}</span>
                                    </div>
                                    <div>
                                        <span>District:</span>
                                        <span className="ms-2 text-black/50">{address?.district || "not provided"}</span>
                                    </div>
                                    <div>
                                        <span>POST:</span>
                                        <span className="ms-2 text-black/50">{address?.post || "not provided"}</span>
                                    </div>
                                    <div>
                                        <span>Mobile:</span>
                                        <span className="ms-2 text-black/50">{address?.mobile || "not provided"}</span>
                                    </div>
                            </div>
                            <button className="w-full py-2 bg-black/90 text-white rounded hover:bg-blue-500 transition-all duration-500 cursor-pointer h-13"
                                    onClick={()=>setIsDetails(true)}>
                               {!isAddressValid()?"Add Address":"Change Address"} 
                               
                            </button>
                        </div>
                    </div>

                    {isDetails &&(
                                    <div>
                                    <div className={`fixed inset-0 z-40 backdrop-blur-sm bg-black/50`}>
                                       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                                       <div className= "bg-white/90 backdrop-blur-md rounded-xl p-6 max-w-md w-full shadow-xl">
                                        <div className="flex justify-between items-center mb-4">
                                            <h1 className="text-2xl font-bold text-gray-800">Edit address</h1>
                                            <button 
                                                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                                                onClick={() => setIsDetails(false)}>
                                                ✕
                                            </button>
                                        </div>
                                        <form className="space-y-4" onSubmit={HandleSubmit}>
                                            <input placeholder="House NO" value={address.house_no || ""}  type="text" name="house_no" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent" onChange={HandleData}/>
                                            <input placeholder="Landmark" value={address.landmark || ""} type="text" name="landmark"  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent" onChange={HandleData}/>
                                            <input placeholder="Town" value={address.town || ""} type="text" name="town"  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent" onChange={HandleData}/>
                                            <input placeholder="District" value={address.district || ""} type="text" name="district"  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent" onChange={HandleData}/>
                                            <input placeholder="POST" value={address.post || ""} type="text" name="post"  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent" onChange={HandleData}/>
                                            <input placeholder="Mobile" value={address.mobile || ""} type="text" name="mobile"  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent" onChange={HandleData}/>
                                            <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors cursor-pointer">Save Changes</button>
                                        </form>
                                       </div>
                                    </div>
                                    </div>
                                    </div>
                                )}

                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:scale-102 transition-all duration-200 ease-in-out">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h2>
                        <div className="space-y-4">
                            <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                                <div className="flex items-center mb-3">
                                    <input type="radio" id="upi" name="payment" className="mr-2" defaultChecked value="razorpay" onChange={(e)=>setPayment(e.target.value)} />
                                    <label htmlFor="upi" className="font-medium text-gray-800">UPI Payment /Card payment</label>
                                </div>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-4 gap-2 ">
                                        {['PhonePe', 'GPay', 'Paytm', 'BHIM'].map(app => (
                                            <button 
                                                key={app}
                                                className="p-2 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 "
                                            >
                                                {app}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center">
                                    <input type="radio" id="COD" name="payment" className="mr-2" value="COD" onChange={(e)=>setPayment(e.target.value)} />
                                    <label htmlFor="COD" className="font-medium text-gray-800">Cash on delivery (COD)</label>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 text-center">
                                By choosing COD has cost ₹ 7
                            </p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:scale-102 transition-all duration-200 ease-in-out">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                        <div className="space-y-4">
                            <div className="space-y-3">
                                {product  && (
                                    <div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>{product.name}</span>
                                            <span>₹{originalPrice.toFixed(2)}</span>
                                        </div>
                                        
                                        <div className="flex justify-between text-gray-600">
                                            <span>Discount</span>
                                            <span className="text-red-500">- {Math.round(originalPrice * 0.05)}</span>
                                        </div>
                                    </div>
                                )}
                                {products.length > 0 && (
    <div className="space-y-2">
        {products.map((item) => {
            // Works for both single-product and cart-product formats
            const price = item.product?.price ?? item.price ?? 0;
            const qty = item.quantity ?? 1;
            const name = item.product?.name ?? item.name ?? "Product";

            return (
                <div key={item.id} className="flex justify-between text-gray-600">
                    <span>{name} ({qty})</span>
                    <span>₹{(price * qty).toFixed(2)}</span>
                </div>
            );
        })}
    </div>
)}
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{baseAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Handling fee</span>
                                    <span>₹ {confession}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>₹ {shipping}</span>
                                </div>
                                
                                <hr className="my-3 border-gray-200" />
                                <div className="flex justify-between font-semibold text-lg text-gray-800">
                                    <span>Total</span>
                                    <span>₹{(baseAmount + shipping + confession )}</span>
                                </div>
                            </div>
                            <button className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-orange-400  transition-all duration-500 cursor-pointer"
                                    onClick={async()=>{
                                            if (!isAddressValid()) return toast.info("Fill address first");

                                            payment === "COD"
                                                ? handleCOD()
                                                : handleRazorpay();
                                        }}
                                        >
                              {payment==="COD"?"Place Order":"Pay Now"}
                            </button>
                            <p className="text-sm text-gray-500 text-center">
                                By completing your purchase you agree to our Terms of Service
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;