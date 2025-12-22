import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialValue={name:"", email:"",username:"", password:"",confirm:'',role:"user",status:"active"}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

function Register(){

    const [formData,setFormData]=useState(initialValue);
    const [msg,setMsg]=useState('');
    const [loading, setLoading] = useState(false);

    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    
    const navigate=useNavigate()

    const handleSubmit= async (e)=>{
        e.preventDefault();

        if (!emailRegex.test(formData.email)) {
            setMsg("Please enter a valid email address!");
            return;
        }


        if (!passwordRegex.test(formData.password)) {
            setMsg("Password must be at least 8 characters and include letters & numbers!");
            return;
        }

        if(formData.password !==formData.confirm){
            setMsg("password must be same !!");
            return
        }
        

        try{
            const response= await fetch('https://technox-e-com.duckdns.org/api/register/',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(formData)
            })

            // console.log("response",response) 
            
            const data = await response.json();
            console.log(data);
            

            if(response.ok){
                setLoading(true);
                setMsg("signUp successfully");
                setFormData({name:'',email:'',username:'',password:'',confirm:''});

                setTimeout(()=>{
                    navigate('/login')
                    toast.success("Sign-up Successfully")
                },1000)
                
            }
            else{
                setMsg(data.email || data.message || "SignUp failed")
            }
        }
        catch (e){
            console.log(e)
            setMsg("Network Error",e.message);
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
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-8 w-80 sm:w-150 max-w-md mx-auto mt-18">
            <div className="relative">
                <Link to="/" className="absolute top-0 right-0 z-10 p-2 -mt-2 -mr-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                    <IoClose className="h-5 w-5 text-white hover:text-red-400" />
                </Link>
                <div className="inline-block backdrop-blur-xl bg-white/10 border-2 border-white/20 rounded-xl shadow-2xl px-5 py-2 overflow-hidden relative h-13 w-35 sm:w-50 mb-2">
                    <h1 className="text-2xl font-bold text-white whitespace-nowrap">Sign-Up</h1>
                </div>
            <form className="text-sm" onSubmit={handleSubmit}>
                <input name="name" type="text" placeholder="Name" 
                    className="w-full px-4 py-2 mb-4 bg-transparent border border-white/30 rounded-md text-white placeholder-white 
                                focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300  hover:scale-105"
                    onChange={handleChange} value={formData.name} required>
                </input>
                <input name="email" type="text" placeholder="E-mail" 
                    className="w-full px-4 py-2 mb-4 bg-transparent border border-white/30 rounded-md text-white placeholder-white 
                                focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300  hover:scale-105"
                    onChange={handleChange}  value={formData.email} required>
                </input>
                <input name="username" type="text" placeholder="Username" 
                    className="w-full px-4 py-2 mb-4 bg-transparent border border-white/30 rounded-md text-white placeholder-white 
                                focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300  hover:scale-105"
                    onChange={handleChange}  value={formData.username} required>
                </input>
                <input name="password" type="text" placeholder="Password" 
                    className="w-full px-4 py-2 mb-4 bg-transparent border border-white/30 rounded-md text-white placeholder-white
                                focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300  hover:scale-105"
                    onChange={handleChange}  value={formData.password} required>
                </input>
                <input name="confirm" type="password" placeholder="Confirm Password" 
                    className="w-full px-4 py-2 mb-4 bg-transparent border border-white/30 rounded-md text-white placeholder-white
                                focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300  hover:scale-105 "
                    onChange={handleChange} value={formData.confirm} required>
                </input>
                <h6 className="mt-3">Already Have Account?<Link to="/login" className="text-blue-50 transition duration-200 hover:text-blue-300"> Login</Link></h6>

                <button type="submit" className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg h-10 w-40 mt-10
                                                    transition duration-300 hover:bg-orange-300 hover:scale-105">Signup
                </button>
                <div className="text-red-800  mt-4 font-semibold">
                {msg && <p>{msg}</p>}
                </div>
            </form>
        </div>
        </div>
      </div>
    )
}

export default  Register