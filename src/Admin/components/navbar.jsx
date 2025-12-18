import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";


function AdminNavbar() {
    return (
        <nav className='fixed top-0 left-64 right-0 z-[100] bg-black backdrop-blur-md border-b border-white/20 p-3'>
            <div className="flex justify-between items-center">
                {/* Search input in the center */}
                <div className="flex-1 max-w-2xl mx-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-4 pl-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30"
                        />
                        <svg 
                            className="absolute left-3 top-2.5 h-5 w-5 text-gray-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                            />
                        </svg>
                    </div>
                </div>
                
                {/* Profile icon on the right */}
                <div className="flex items-center">
                    <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                       <FiUser/>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default AdminNavbar;