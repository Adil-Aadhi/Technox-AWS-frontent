import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { IoClose } from 'react-icons/io5';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import api from "../../axiosConfig";


function Login(){

        const navigate=useNavigate();
        const [userName,setUserName]=useState('')
        const [password,setPassword]=useState('')
        const [error,setError]=useState('')
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [loading, setLoading] = useState(false);
        const [forgetPass,setForgetPass] = useState(false)


        const [email, setEmail] = useState("");
        const [otp, setOtp] = useState("");
        const [newPassword, setNewPassword] = useState("");
        const [newConfirmPassword, setNewConfirmPassword] = useState("");
        const [otpVerified, setOtpVerified] = useState(false);

        const userData = JSON.parse(localStorage.getItem('user'));

        useEffect(()=>{
                if(userData && userData.role==="admin"){
                    navigate("/admin",{replace:true})
                }
                else if(userData){
                    navigate('/',{replace:true})
                }
                
        },[])



        const HandleLogin = async (e) => {
                e.preventDefault();

                if(!userName || !password){
                    setError("Please enter both username/Email and Password");
                    return
                }
                setLoading(true)
                try{
                    const res= await api.post('/api/login/',{
                        identifier:userName,
                        password:password,
                    });
                    localStorage.setItem('access',res.data.access);
                    localStorage.setItem('user',JSON.stringify({
                        ...res.data.user,isLoggedIn: true}));

                    toast.success("Login successful!");
                    setLoading(false)
                        console.log("User role:", res.data.user.role);
                    navigate(res.data.user.role === "admin" ? "/admin" : "/");
                }
                catch (err){
                    if (err.response){
                        setError(err.response.data.detail || err.response.data.non_field_errors || "Enter valid username/password");
                        setLoading(false)
                    }else{
                        setError("Network error. Please try again.");
                        setLoading(false)
                    }
                }
    };

    const handleGenerateOtp = async () => {
        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        setLoading(true)

        try {
            await api.post("/api/forgot-password/send-otp/", { email });
            toast.success("OTP sent to your email");
            setLoading(false)
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to send OTP");
            setLoading(false)
        }
        };

    const handleOtpChange = (e, index) => {
        const value = e.target.value;

        // allow only numbers
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = otp.split("");
        newOtp[index] = value;
        setOtp(newOtp.join(""));

        // auto move next
        if (value && e.target.nextSibling) {
            e.target.nextSibling.focus();
        }
    };

    const handleOtpKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
            e.target.previousSibling.focus();
        }
    };


    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        if (otp.length !== 6) {
            toast.error("Please enter 6-digit OTP");
            return;
        }

        try {
            await api.post("/api/forgot-password/verify-otp/", {
            email,
            otp,
            });

            toast.success("OTP verified ✅");
            setForgetPass(false)
            setOtpVerified(true);   // ✅ unlock next step
        } catch (err) {
            toast.error(err.response?.data?.error || "Invalid OTP");
        }
    };

    const handleResetPassword=async()=>{

        if (newPassword!==newConfirmPassword){
            toast.error("password must be same")
            return
        }

        try{
            await api.post('/api/forgot-password/reset-password/',{email,new_password:newPassword,confirm_password:newConfirmPassword})
            toast.success("password successfully changed")
            setForgetPass(false);
            setOtpVerified(false);
            setOtp("");
        }
        catch(e){
            toast.error(
                e.response?.data?.error ||
                e.response?.data?.detail ||
                "Failed to reset password"
            );
        }
    }
                            
           

    return(
        <div className="flex items-center justify-center min-h-screen">
            {loading && (
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
            <div className="relative w-80 sm:w-110">
                <Link to="/" className="absolute top-9 right-8 z-10 p-2 -mt-2 -mr-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                    <IoClose className="h-5 w-5 text-white hover:text-red-400" />
                </Link>
         <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-8 ">
            <div className="inline-block backdrop-blur-xl bg-white/10 border-2 border-white/20 rounded-xl shadow-2xl px-6 py-2 overflow-hidden relative w-35 sm:w-50 h-13 mb-2">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/0 opacity-20 -z-10"></div>
                    <h1 className="text-2xl font-bold text-white whitespace-nowrap">Login</h1>
            </div>
            <form className="text-sm" onSubmit={HandleLogin}>
                <input type="text" placeholder="Username/E-mail" onChange={(e)=>setUserName(e.target.value)}
                    className="w-full px-4 py-2 mb-4 bg-transparent border border-white/30 rounded-md text-white placeholder-white 
                                focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300  hover:scale-105" required>
                </input>
                <input type="password" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)}
                    className="w-full px-4 py-2 mb-4 bg-transparent border border-white/30 rounded-md text-white placeholder-white
                                focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300  hover:scale-105" required>
                </input>
                <button type="button" class="text-md text-red-600 bg-black/20 rounded-2xl p-2 hover:text-white/50 hover:underline transition cursor-pointer" onClick={()=>setForgetPass(true)}>
                    Forgot password?
                </button>
                <h6 className="mt-3">Don't have account?<Link to="/register" className="text-blue-50 transition duration-200 hover:text-blue-300"> SignUp</Link></h6>
                <div>
                     {error && <p className="text-red-500 mt-4 font-bold">{error}</p> }
                </div>
                <button type="submit" className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg h-10 w-40 mt-10
                                transition duration-300 hover:bg-green-300 hover:scale-105">Get Started
                </button>
            </form>
            {forgetPass && (
                <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black/40 backdrop-blur-sm p-1 ">
                        <div className="bg-white/95 rounded-2xl p-6 max-w-lg w-full shadow-2xl relative">
                            <div className="flex justify-between items-center mb-5">
                            <h1 className="text-xl font-semibold text-gray-800">
                                Forgot Password
                            </h1>
                            <button
                                className="text-gray-400 hover:text-red-500 text-xl"
                                onClick={() => setForgetPass(false)}
                            >
                                ✕
                            </button>
                            </div>
                            <form className="space-y-5" onSubmit={handleVerifyOtp}>
                            <div>
                                <label className="text-sm text-gray-600 mb-1 block">
                                Registered Email
                                </label>

                                <div className="flex gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    placeholder="Enter email"
                                    className="flex-1 p-3 border border-gray-300 rounded-lg 
                                            focus:outline-none focus:ring-2 focus:ring-green-400"
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg 
                                            hover:bg-green-600 whitespace-nowrap"
                                    onClick={handleGenerateOtp}
                                >
                                    Generate OTP
                                </button>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm text-gray-600 mb-1 block">
                                Enter OTP
                                </label>

                                <div className="flex justify-between gap-2">
                                {Array(6).fill("").map((_, i) => (
                                    <input
                                    key={i}
                                    type="text"
                                    maxLength="1"
                                    value={otp[i] || ""}
                                    onChange={(e) => handleOtpChange(e, i)}
                                    onKeyDown={(e) => handleOtpKeyDown(e, i)}
                                    className="w-14 h-14 text-center text-xl font-semibold 
                                                border border-gray-300 rounded-lg 
                                                focus:outline-none focus:ring-2 focus:ring-green-400"
                                    />
                                ))}
                                </div>
                            </div>
                            <button
                                className="w-full bg-green-500 text-white py-3 rounded-lg 
                                        hover:bg-green-600 transition-all font-medium"
                            >
                                Verify & Continue
                            </button>
                            </form>
                        </div>
                    </div>
                                )}
                                {otpVerified && (
                                    <div className="fixed inset-0 z-[60] flex items-center justify-center
                                                    bg-black/40 backdrop-blur-sm p-4">
                                        
                                        <div className="bg-white/95 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                                        
                                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                            Reset Password
                                        </h2>

                                        <div className="space-y-3">
                                            <div>
                                            <label className="text-sm text-gray-600 mb-1 block">
                                                New Password
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="Enter new password"
                                                className="w-full p-2.5 border border-gray-300 rounded-lg
                                                        focus:outline-none focus:ring-2 focus:ring-green-400"
                                                onChange={(e)=>setNewPassword(e.target.value)}
                                            />
                                            </div>

                                            <div>
                                            <label className="text-sm text-gray-600 mb-1 block">
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="Re-enter password"
                                                className="w-full p-2.5 border border-gray-300 rounded-lg
                                                        focus:outline-none focus:ring-2 focus:ring-green-400"
                                                onChange={(e)=>setNewConfirmPassword(e.target.value)}
                                            />
                                            </div>

                                            <button
                                            type="button"
                                            className="w-full bg-green-500 text-white py-2.5 rounded-lg
                                                        hover:bg-green-600 transition-all font-medium"
                                            onClick={handleResetPassword}
                                            >
                                            Reset Password
                                            </button>
                                        </div>
                                        </div>
                                    </div>
                                    )}

            </div>
        </div>
      </div>
    )
}
export default Login