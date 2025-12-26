import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {FiUser,FiShoppingBag,FiMenu,FiCamera } from "react-icons/fi";
import { useState,useEffect,useContext } from "react";
import Order from "../components/orders";
import { CartContext } from "../components/useContext/cartwishContext";
import api from "../../axiosConfig"




function Profile(){

    const {cartLength,setCartLength,wishLength,setWishLength}=useContext(CartContext)
    const math=Math.floor(Math.random() * 10) + 1
    const math2=Math.random()
    const navigate=useNavigate();
    const storedUser=localStorage.getItem('user');
    const userData = storedUser ? JSON.parse(storedUser):null;
    const isLoggedIn = userData?.isLoggedIn === true;
    const displayData=isLoggedIn ? userData:{name:`guest${math}`,email:`guest${math}@${math2}`}
    const [menuOpen,setMenuOpen]=useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    const [editUser, setEditUser] = useState(false);
    const [userForm, setUserForm] = useState({name: displayData?.name || "",username: displayData?.username || "",email:displayData?.email || ""});
    const [passModal,setPassModal] =useState(false) 
    const [passForm,setPassForm]= useState({old_password:"",new_password:"",confirm_password:""})

    const [address,setAddress]=useState({house_no:"",landmark:"",town:"",district:"",post:"",mobile:""})
    const [profileImage, setProfileImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const [details,Setdetails]=useState(false)

    const HandleData = (e) => {
        const { name, value } = e.target;

        setAddress((prev) => ({
            ...prev,
            [name]: value 
        }));
    };


    const HandleSubmit=(e)=>{
        e.preventDefault();
        const data = { ...address };
        delete data.user;


        api.patch(`/api/user/address/`,data)
        .then((res)=>{toast.success("Address is updated");
             Setdetails(false);
    })
        .catch((e)=>{console.log("error",e);
            toast.error("Error saving address")})
    }


    const HandleDetails =()=>{
        api.get(`/api/user/address/`)
        .then((res)=>setAddress(res.data  || {
        house_no:"", landmark:"", town:"", district:"", post:"", mobile:""
    }))
    .catch(()=>{
            setAddress({
                house_no:"", landmark:"", town:"", district:"", post:"", mobile:""
            })
        })
    }

    const HandleUserSubmit =async(e)=>{
        e.preventDefault()
        try{
             const res=await api.patch(`/api/user/updateprofile/`, userForm);
             toast.success("Profile updated successfully");
                const updatedUser = {
                ...displayData,
                name: userForm.name,
                username: userForm.username,
                email: userForm.email,
                isLoggedIn: true,
                };
                localStorage.setItem("user", JSON.stringify(updatedUser));
             setEditUser(false);
        }
        catch(e){
            console.log("Error on changing details");
            toast.error("Error updating profile");
        }
    }

    const HandlePass=async(e)=>{
        e.preventDefault()
        console.log(passForm);
        if (passForm.new_password!=passForm.confirm_password){
            return  toast.error("New and Confirm Password must be same");
        }
        try{
        const res=await api.patch(`/api/user/updatepassword/`, passForm);
        toast.success("Password updated successfully");
        setPassModal(false)
        }catch(err){
            toast.error(err.response?.data?.error || "Password update failed");
        }
        
    }

   const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setLoading(true)
        // 1️⃣ Update preview instantly
        setProfileImage(file);
        setPreview(URL.createObjectURL(file));


        // 2️⃣ Upload automatically
        const formData = new FormData();
        formData.append("profile", file);

        api.patch("/api/user/profile-image/", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
            toast.success("Profile image updated");
            setLoading(false)
        })
        .catch((e) => {
            console.log(e.response?.data);
            toast.error("Couldn't update image");
            setLoading(false)
        });
        };



    useEffect(()=>{
        if(isLoggedIn){
            HandleDetails();
        }
    },[userData?.id])

    useEffect(() => {
        api.get("/api/user/profile/")
            .then(res => {
            if (res.data.profile) {
                setPreview(res.data.profile);  // show image
            }
            })
            .catch(err => console.log(err));
        }, []);


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

    return (
        <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black
 min-h-screen p-4">
    <div className="absolute inset-0 bg-black/40">
            <div  className="lg:hidden fixed top-6 left-6 z-50">
                <button className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mt-15"
                        onClick={() => setMenuOpen(!menuOpen)}>
                    <FiMenu className="text-2xl"/>
                </button>
            </div>
            {menuOpen && (
                <div className="lg:hidden fixed inset-0 backdrop-blur-3xl opacity-100 bg-white/0 z-40" onClick={()=>setMenuOpen(false)}>
                </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr]   pt-20 mt-5 mb-5">
                    <div>
                        <aside className={`
                                            ${menuOpen ? "fixed top-0 left-0 h-full w-60 z-50" : "hidden"} 
                                            lg:block lg:fixed lg:top-20
                                            w-64
                                            bg-white/0 lg:bg-transparent
                                            backdrop-blur-sm
                                            border-2 border-white/20
                                            rounded-lg lg:rounded-xl
                                            p-6
                                            text-white
                                            overflow-y-auto mt-9
                                        `}>
                            <div className="flex justify-between items-center mt-3 mb-6">
                                <h2 className="text-xl font-bold mb-6">Menu</h2>
                                <button className="lg:hidden p-1 text-white/70 hover:text-white"
                                    onClick={()=>setMenuOpen(false)}>
                                    ✕
                                </button>
                            </div>
                            
                            <hr className="border-white/20 mb-6"></hr>
                            <ul className="space-y-4">
                            <li className={`backdrop-blur-md  p-4 rounded-lg border  hover:bg-white/10 hover:border-red-400 hover:text-red-300 transition-all duration-300
                                            shadow-lg hover:shadow-xl cursor-pointer ${activeTab ==="profile"?"bg-white/10 border-red-400 text-red-300":"bg-white/5 border-white/20"}`} onClick={()=>setActiveTab("profile")}>
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 rounded-full bg-white/10 border border-red-400 ">
                                    <FiUser className="text-white/80 " />
                                    </div>
                                    <span className="font-medium">Profile</span>
                                </div>
                            </li>
                            <li className={`backdrop-blur-md  p-4 rounded-lg border  hover:bg-white/10 hover:border-red-400 hover:text-red-300 transition-all duration-300
                                            shadow-lg hover:shadow-xl cursor-pointer  ${activeTab==="orders"?"bg-white/10 border-red-400 text-red-300":"bg-white/5 border-white/20"} `} onClick={()=>setActiveTab("orders")}>
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 rounded-full bg-white/10 border border-red-400">
                                    <FiShoppingBag  className="text-white/80" />
                                    </div>
                                    <span className="font-medium">Orders</span>
                                </div>
                            </li>
                            
                            </ul>
                        </aside>
                    </div>
                        
                    {activeTab ==="profile" &&(
                        <div className="backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-xl">
                    <div className="backdrop-blur-xl bg-white/3  rounded-2xl border border-white/20 p-8 shadow-2xl">
                    
                        <div >
                            <h1 className="text-4xl font-bold text-white text-center mb-8">Profile</h1>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-10">
                           <div className="flex justify-center">
  <label className="relative h-40 w-40 rounded-full bg-white/10 backdrop-blur-md border-2 border-red-400 flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out hover:scale-103 cursor-pointer overflow-hidden">

    <input 
      type="file"
      className="hidden"
      accept="image/*"
      onChange={handleImageChange}
    />

    {preview ? (
      <img 
        src={preview}
        alt="Profile"
        className="h-full w-full object-cover"
      />
    ) : (
      <FiUser className="text-4xl text-white/70" />
    )}

    <div className="absolute bottom-2 right-2 bg-black/60 p-2 rounded-full">
      <FiCamera className="text-white text-md" />
    </div>
  </label>
</div>
                             <div className="space-y-6">
                                <div className="backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg">
                                {isLoggedIn && (
                                    <div className="flex justify-end [390px]:relative md:relative">
                                        <button
                                        className="
                                            bg-orange-500 text-white
                                            px-2 py-1 text-xs
                                            md:px-3 md:py-2 md:text-sm
                                            rounded-lg shadow
                                            hover:bg-orange-600 active:scale-95 transition cursor-pointer

                                            [390px]:absolute [390px]:top-0 [390px]:right-0
                                        "
                                        onClick={() => setPassModal(true)}
                                        >
                                        Change Password
                                        </button>
                                    </div>
                                    )}

                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                           <span className="text-white/80 font-medium"> Name:</span> 
                                            <span className="text-white ms-2">{displayData.name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-white/80 font-medium">Username:</span> 
                                            <span className="text-white ms-2">{displayData.username}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-white/80 font-medium">Email:</span> 
                                            <span className="text-white ms-2 break-words max-w-[200px] sm:max-w-none truncate">{displayData.email}</span>
                                        </div>
                                        <button
                                                className="
                                                cursor-pointer bg-green-500 
                                                p-1 text-xs w-32          /* mobile size */
                                                rounded-2xl ml-2 
                                                text-white hover:bg-green-600

                                                sm:p-2 sm:text-sm sm:w-40 /* small tablets and up */
                                                md:w-50                   /* desktop stays same */
                                                "
                                            onClick={() => {
                                                if (!isLoggedIn) {
                                                toast.error("Please Login");
                                                } else {
                                                setEditUser(true);
                                                }
                                            }}
                                            >
                                            Edit Profile
                                            </button>
                                        <div className=" flex items-center ">
                                            <span className="text-white/80 font-medium ">Address:</span>
                                        </div>
                                        <div className="bg-white/10 me-3 text-white/70 rounded-md p-3  text-sm ">
                                            
                                                
                                                <div className="grid grid-cols-2 max-[429px]:grid-cols-1 gap-2">
                                                    <div  className="flex flex-col">
                                                        <span  className="font-medium text-white/80">House No:</span>
                                                         <span className="text-white/50">{address.house_no || "Not provided"}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span  className="font-medium text-white/80">Landmark:</span>
                                                         <span className="text-white/50">{address.landmark || "Not provided"}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span  className="font-medium text-white/80">Town/City:</span>
                                                         <span className="text-white/50">{address.town || "Not provided"}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span  className="font-medium text-white/80">District:</span>
                                                         <span className="text-white/50">{address.district  || "Not provided"}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span  className="font-medium text-white/80">POST:</span>
                                                         <span className="text-white/50">{address.post  || "Not provided"}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span  className="font-medium text-white/80">Mobile:</span>
                                                         <span className="text-white/50">{address.mobile  || "Not provided"}</span>
                                                    </div>    
                                            </div>
                                        </div>
                                            <button className="cursor-pointer bg-blue-500 w-20 h-8 rounded-2xl text-white hover:bg-blue-600" onClick={()=>
                                            {if(!isLoggedIn){
                                                toast.error("Please-Login")
                                            }
                                            else{Setdetails(true)}}}>
                                                {Object.values(address).some(val => val) ? "Edit" : "Add"}</button>
                                        
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div>
                                
                                {details &&(
                                    <div>
                                    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                       <div className= "bg-white/90 backdrop-blur-md rounded-xl p-6 max-w-md w-full shadow-xl relative">
                                        <div className="flex justify-between items-center mb-4">
                                            <h1 className="text-2xl font-bold text-gray-800">Edit address</h1>
                                            <button 
                                                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                                                onClick={() => Setdetails(false)}>
                                                ✕
                                            </button>
                                        </div>
                                        <form className="space-y-4" onSubmit={HandleSubmit}>
                                            <input placeholder="House NO" value={address.house_no}  type="text" name="house_no" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent" onChange={HandleData}/>
                                            <input placeholder="Landmark" value={address.landmark} type="text" name="landmark"  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent" onChange={HandleData}/>
                                            <input placeholder="Town" value={address.town} type="text" name="town"  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent" onChange={HandleData}/>
                                            <input placeholder="District" value={address.district} type="text" name="district"  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent" onChange={HandleData}/>
                                            <input placeholder="POST (must be 6 number)" value={address.post} type="text" maxLength={6} name="post"  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent" onChange={HandleData}/>
                                            <input placeholder="Mobile (must be 10 number)" value={address.mobile} type="text" maxLength={10} name="mobile"  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent" onChange={HandleData}/>
                                            <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors cursor-pointer">Save Changes</button>
                                        </form>
                                       </div>
                                    </div>
                                    </div>
                                )}



                                {isLoggedIn ?
                                    <button className="
                                                px-6 py-2 w-50 mt-7
                                                rounded-lg 
                                                backdrop-blur-md 
                                                bg-red-500/50 
                                                border border-red-400/30 
                                                text-red-100 
                                                font-medium 
                                                shadow-lg 
                                                hover:bg-red-500
                                                hover:border-red-400/50 
                                                hover:text-white 
                                                transition-all 
                                                duration-300
                                                hover:shadow-red-500/20 cursor-pointer"
                                        onClick={async () => {
                                            

                                            await api.post('/api/logout/', {}, { withCredentials: true });


                                            localStorage.removeItem('user');
                                            localStorage.removeItem('access');


                                            setCartLength(0);
                                            setWishLength(0);

                                            setTimeout(() => {
                                                toast.info("Log-out successfully");
                                                navigate("/login");
                                            }, 100);
                                        }}>
                                    LogOut
                                </button>
                                :
                                    <button className="
                                                px-6 py-2 w-50 mt-7
                                                rounded-lg 
                                                backdrop-blur-md 
                                                bg-red-500/50 
                                                border border-red-400/30 
                                                text-red-100 
                                                font-medium 
                                                shadow-lg 
                                                hover:bg-red-500
                                                hover:border-red-400/50 
                                                hover:text-white 
                                                transition-all 
                                                duration-300
                                                hover:shadow-red-500/20 cursor-pointer"
                                        onClick={()=>{
                                            toast.info("Please Login")
                                            navigate('/login')
                                        }}>
                                    LogIn
                                    </button>
                                }
                                
                            </div>
                        </div>
                    </div>
                    )}

                    {activeTab==="orders" &&(
                        <Order/>
                    )}
                    {editUser && (
                                <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/10">
                                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 max-w-md w-full shadow-xl">
                                        <div className="flex justify-between items-center mb-4">
                                        <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>
                                        <button
                                            className="text-gray-500 hover:text-gray-700 cursor-pointer"
                                            onClick={() => setEditUser(false)}
                                        >
                                            ✕
                                        </button>
                                        </div>

                                        <form
                                        className="space-y-4" onSubmit={HandleUserSubmit}
                                        >
                                        <input
                                            placeholder="Name"
                                            value={userForm.name}
                                            type="text"
                                            name="name"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                            onChange={(e) =>
                                            setUserForm({ ...userForm, [e.target.name]: e.target.value })
                                            }
                                        />
                                        <input
                                            placeholder="Username"
                                            value={userForm.username}
                                            type="text"
                                            name="username"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                            onChange={(e) =>
                                            setUserForm({ ...userForm, [e.target.name]: e.target.value })
                                            }
                                        />
                                        <input
                                            placeholder="Email"
                                            value={userForm.email}
                                            type="text"
                                            name="email"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                            onChange={(e) =>
                                            setUserForm({ ...userForm, [e.target.name]: e.target.value })
                                            }
                                        />
                                        <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors cursor-pointer">
                                            Save Changes
                                        </button>
                                        </form>
                                    </div>
                                    </div>
                                </div>
                                )}
                    
                
                                    {passModal && (
                                        <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/10">
                                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                                            <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 max-w-md w-full shadow-xl">
                                                <div className="flex justify-between items-center mb-4">
                                                <h1 className="text-2xl font-bold text-gray-800">Change Password</h1>
                                                <button
                                                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                                                    onClick={() => setPassModal(false)}
                                                >
                                                    ✕
                                                </button>
                                                </div>

                                                <form
                                                className="space-y-4" onSubmit={HandlePass}
                                                >
                                                <input
                                                    placeholder="Old Password"
                                                    type="password"
                                                    name="old_password"
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                                    onChange={(e) =>
                                                    setPassForm({ ...passForm, [e.target.name]: e.target.value })
                                                    }
                                                />
                                                <input
                                                    placeholder="New password"
                                                    type="text"
                                                    name="new_password"
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                                    onChange={(e) =>
                                                    setPassForm({ ...passForm, [e.target.name]: e.target.value })
                                                    }
                                                />
                                                <input
                                                    placeholder="Confirm password"
                                                    type="password"
                                                    name="confirm_password"
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                                    onChange={(e) =>
                                                    setPassForm({ ...passForm, [e.target.name]: e.target.value })
                                                    }
                                                />
                                                <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors cursor-pointer">
                                                    Save Changes
                                                </button>
                                                </form>
                                            </div>
                                            </div>
                                        </div>
                                        )}




            </div>
            </div>
        </div>
    )
}

export default Profile