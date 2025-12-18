import { Link } from "react-router-dom"
import { useState } from "react"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaTimes } from 'react-icons/fa';
import axios from "axios";
import { toast } from "react-toastify";


function Footer(){

    const [isOpen,setIsOpen]=useState(false);
    // const [subscribe,setSubscribe]=useState('')
    // const userData= JSON.parse(localStorage.getItem("currentUser"));
    // const userId = userData?.id;
    // const userName= userData?.name;

    // const HandleSubscribe=async()=>{
    //   try{
    //     const res=await axios.post(`http://localhost:3000/notification`,{
    //       userId,userName,subscribe
    //     })
    //     setSubscribe('');
    //     toast.success("Sucessyfully Subscribed")


    //   }
    //   catch(e){
    //     console.log("error on sending email",e)
    //   }
    // }

    return (
    <footer className="w-full bg-black border-t border-white/20">
      
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[101] flex items-center justify-center">
          <div className="bg-black/90 p-6 rounded-lg border border-white/20 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-xl font-bold">Connect With Us</h2>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <div className="text-white flex gap-5 text-2xl justify-center">
              <FaFacebook className="cursor-pointer hover:text-blue-500" />
              <FaTwitter className="cursor-pointer hover:text-sky-400" />
              <FaInstagram className="cursor-pointer hover:text-pink-500" />
              <FaLinkedin className="cursor-pointer hover:text-blue-400" />
              <FaYoutube className="cursor-pointer hover:text-red-500" />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-10 text-gray-300">
        <div>
          <div className="flex items-center space-x-3">
            <Link to="/">
              <img 
                src="/logo1.png" 
                alt="Company Logo" 
                className="w-12 h-12 md:w-16 md:h-16 hover:opacity-80 transition"
              />
            </Link>
            <h2 className="text-white text-xl font-semibold">
              Techn<span className="text-red-400">o</span>
              <span className="text-2xl text-red-500">X</span>
            </h2>
          </div>
          <p className="mt-3 text-sm">
            Empowering Future with Technology
          </p>
        </div>


        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><button onClick={() => setIsOpen(true)} className="hover:text-white cursor-pointer">Connect Us</button></li>
            <li><p className="hover:text-white">Privacy Policy</p></li>
            <li><p className="hover:text-white">Terms & Conditions</p></li>
          </ul>
        </div>


        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <p className="text-sm">📍 Malappuram, Kerala, India</p>
          <p className="text-sm">📧 support@technox.com</p>
          <p className="text-sm">📞 +91 9544773622</p>
        </div>


        {/* <div>
          <h3 className="text-white font-semibold mb-3">Subscribe</h3>
          <p className="text-sm mb-2">Stay updated with our latest news</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-3 py-2 rounded-l-md bg-gray-800 text-white text-sm w-full focus:outline-none"
              onChange={(e)=>setSubscribe(e.target.value)}
              value={subscribe}
            />
            <button className="px-4 py-2 bg-red-600 text-white rounded-r-md hover:bg-red-700"
              onClick={()=>HandleSubscribe()}>
              Subscribe
            </button>
          </div>
        </div> */}
      </div>


      <div className="border-t border-white/10 py-4 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} TechnoX. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2 text-lg">
          <FaFacebook className="cursor-pointer hover:text-white" />
          <FaTwitter className="cursor-pointer hover:text-white" />
          <FaInstagram className="cursor-pointer hover:text-white" />
          <FaLinkedin className="cursor-pointer hover:text-white" />
          <FaYoutube className="cursor-pointer hover:text-white" />
        </div>
      </div>
    </footer>
  )

}

export default Footer