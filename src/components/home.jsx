import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination,} from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import '../style/swiper.css'
import HomeProducts from "./homeproducts";





function Home() {

    const navigate=useNavigate();

    const ShopNavigate=()=>{
        navigate('/products')
    }

const images = [
    "/iphone1.png",
    "/Asus1.png",
  ];

  return (
    <div className="block mt-6">
        <video
        src="/samsungvid.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-[300px] sm:h-full object-cover">
        </video>

    {/* Chat-GPT */}

        <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    renderBullet: (index, className) => {
                    return `
                        <span class="${className} custom-bullet">
                        <span class="progress-bar"></span>
                        </span>
                    `;
                    },
                }}
                modules={[Autoplay, Pagination]}
                className="w-full h-[300px] sm:h-[500px] relative"
                speed={900}
                >
                {images.map((src, i) => (
                    <SwiperSlide key={i} className="relative">
                    <img 
                        src={src} 
                        alt={`slide-${i}`}
                        className="w-screen h-full object-cover"
                    />
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
                        <button 
                            className="relative bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-xl shadow-2xl h-12 w-44
                                    transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-white/30
                                    text-white font-medium text-sm md:text-base overflow-hidden group cursor-pointer"
                            onClick={ShopNavigate}>
                        {/* Glass shine effect */}
                        <span className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/0 opacity-0 
                                        group-hover:opacity-100 transition-opacity duration-300"></span>
                        
                        
                        
                        {/* Button text with subtle glow */}
                        <span className="relative z-10 flex items-center justify-center h-full w-full">
                        Shop Now
                        <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        </span>
                    </button>
                    </div>
                    </SwiperSlide>
                ))}
                </Swiper>

                <div className=" p-5">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/30 shadow-lg p-6 space-y-6 ">
                        <h1 className="text-white font-bold text-2xl">BRANDS</h1>
                        <hr className="border-white/30"/>
                        <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:gap-4 md:gap-7 px-4 sm:px-6 md:px-10 justify-center">
                            <div className="bg-white/30 backdrop-blur-lg rounded-xl border border-white/30 shadow-lg p-2 sm:p-4 h-20 sm:h-24 flex flex-col items-center justify-center hover:scale-103 transition-transform cursor-pointer sm:w-50 "
                                    onClick={() => navigate(`/products?brand=Asus`)}>
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/2560px-ASUS_Logo.svg.png" 
                                alt="Asus" 
                                className="h-10 sm:h-12 object-contain"
                                />
                                
                            </div>
                        <div className="bg-white/30 backdrop-blur-lg rounded-xl border border-white/30 shadow-lg p-2 sm:p-4 h-20 sm:h-24 flex flex-col items-center justify-center hover:scale-103 transition-transform cursor-pointer sm:w-50 "
                                onClick={() => navigate(`/products?brand=Apple`)}>
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/505px-Apple_logo_black.svg.png" 
                                alt="Apple" 
                                className=" h-10 sm:h-15 object-contain"
                                />
                                
                        </div >
                        <div className="bg-white/30 backdrop-blur-lg rounded-xl border border-white/30 shadow-lg p-2 sm:p-4 h-20 sm:h-24 flex flex-col items-center justify-center hover:scale-103 transition-transform cursor-pointer sm:w-50 "
                                onClick={() => navigate(`/products?brand=Samsung`)}>
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png" 
                                alt="Samsung" 
                                className="h-6 sm:h-8 object-contain"
                                />
                                
                        </div>
                        <div className="bg-white/30 backdrop-blur-lg rounded-xl border border-white/30 shadow-lg p-2 sm:p-4 h-20 sm:h-24 flex flex-col items-center justify-center hover:scale-103 transition-transform cursor-pointer sm:w-50 "
                                onClick={() => navigate(`/products?brand=Google`)}>
                            <img 
                                src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" 
                                alt="Google" 
                                className="h-8 sm:h-10 object-contain"
                                />
                        </div>
                        <div className="bg-white/30 backdrop-blur-lg rounded-xl border border-white/30 shadow-lg p-2 sm:p-4 h-20 sm:h-24 flex flex-col items-center justify-center hover:scale-103 transition-transform cursor-pointer sm:w-50 "
                                onClick={() => navigate(`/products?brand=Lenovo`)}>
                            <img 
                                src="https://cdn.freebiesupply.com/logos/large/2x/lenovo-logo-black-and-white.png" 
                                alt="Lenovo" 
                                className=" h-20 sm:h-30 object-contain"
                                />
                        </div>
                        <div className="bg-white/30 backdrop-blur-lg rounded-xl border border-white/30 shadow-lg p-2 sm:p-4 h-20 sm:h-24 flex flex-col items-center justify-center hover:scale-103 transition-transform cursor-pointer sm:w-50 "
                                onClick={() => navigate(`/products?brand=Xiaomi`)}>
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Xiaomi_logo.svg/1200px-Xiaomi_logo.svg.png" 
                                alt="Xiaomi" 
                                className=" h-18 object-contain"
                                />
                        </div>
                        </div>
                        
                    </div>
                </div>

                <HomeProducts/>
                
        
    </div>
  );
}

export default Home;
