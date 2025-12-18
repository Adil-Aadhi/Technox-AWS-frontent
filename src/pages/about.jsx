import { useNavigate } from "react-router-dom";

function AboutPage() {

const navigate=useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-gray-900 to-black p-6">
      <div className="max-w-3xl w-full backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 text-center">
        <h1 className="text-4xl font-bold text-white mb-6">About Us</h1>
        <p className="text-lg text-gray-200 leading-relaxed mb-6">
          Welcome to <span className="font-semibold text-blue-400">TechnoX</span>, 
          your one-stop destination for the latest gadgets and accessories. 
          We aim to deliver the best shopping experience with premium quality 
          products and a seamless checkout process.
        </p>
        <p className="text-lg text-gray-300 leading-relaxed mb-8">
          Our mission is to make technology more accessible, stylish, and 
          reliable for everyone. Whether you're a gamer, a professional, or 
          someone who loves tech, we’ve got something for you.
        </p>

        <div className="flex justify-center gap-6">
          {/* <button className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl shadow-md transition">
            Contact Us
          </button> */}
          <button className="px-6 py-3 bg-blue-500/80 hover:bg-blue-600 text-white rounded-xl shadow-md transition cursor-pointer"
                  onClick={()=>navigate('/products')}>
            Explore Products
          </button>
        </div>
      </div>
    </div>
  );
}


export default AboutPage