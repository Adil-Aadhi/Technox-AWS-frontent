import { useState, useEffect } from 'react';
import { FiHome, FiUsers, FiBox, FiShoppingCart, FiBarChart2, FiSettings, FiLogOut,FiPieChart,FiChevronRight} from 'react-icons/fi';
import { SidebarContext } from '../context/sidebarContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { NavLink, useLocation } from "react-router-dom";

function AdminSidebar() {
  const [activeItem, setActiveItem] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const {setSidebarOpens}=useContext(SidebarContext)
  const navigate=useNavigate()
  const [showConfirm,setShowConfirm]=useState(false)
   const location = useLocation();



   useEffect(() => {
  const currentPath = location.pathname;
  const foundItem = menuItems.find(item => {
    return currentPath === item.path || currentPath.startsWith(`/${item.path}`);
  });
  if (foundItem) {
    setActiveItem(foundItem.id);
  }
}, [location.pathname]);

  useEffect(() => {

    if (typeof window !== 'undefined' && window.innerWidth < 768) return;


    let timer;
    if (isHovered && !sidebarOpen) {
      setSidebarOpen(true);
      setSidebarOpens(true)
    } else if (!isHovered && sidebarOpen) {
      timer = setTimeout(() => {
        setSidebarOpen(false);
        setSidebarOpens(false)
      }, 300);
    }
    return () => clearTimeout(timer);
  }, [isHovered, sidebarOpen,setSidebarOpens]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome size="20" /> , path:"/admin" },
    { id: 'users', label: 'Users', icon: <FiUsers size="20" />,path:"/admin/users" },
    { id: 'products', label: 'Products', icon: <FiBox size="20" />, path:"/admin/products" },
    { id: 'orders', label: 'Orders', icon: <FiShoppingCart size="20" />,path:"/admin/orders" },
    // { id: 'analytics', label: 'Analytics', icon: <FiBarChart2 size="20" />,path:"analytics" },
    // { id: 'settings', label: 'Settings', icon: <FiSettings size="20" />,path:"settings" },
  ];

  return (
    <>
      <button 
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transition-all hover:shadow-xl"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FiChevronRight 
          size="24" 
          className={`transform transition-transform ${sidebarOpen ? 'rotate-180' : 'rotate-0'}`} 
        />
      </button>

      <div
  className={`fixed inset-y-0 left-0 z-40 transform transition-all duration-300 ease-in-out
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
    w-64 ${sidebarOpen ? 'md:w-64' : 'md:w-20'}`}
  onMouseEnter={() => window.innerWidth >= 768 && setIsHovered(true)}
  onMouseLeave={() => window.innerWidth >= 768 && setIsHovered(false)}
>
        <div className="flex flex-col h-full bg-gradient-to-br from-blue-400/20 via-purple-300/20 to-pink-300/20 backdrop-blur-xl text-white border-r border-white/10 shadow-2xl">
          <div className="flex items-center p-4 border-b border-white/10">
            <div className={`flex items-center transition-opacity duration-300`}>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg mr-3">
                {/* <FiPieChart size="24" className="text-white" /> */}
                <FiChevronRight 
                  size="24" 
                  className={`transform transition-transform ${sidebarOpen ? 'rotate-180' : 'rotate-0'}`} />
              </div>
              <h2 className={`text-xl font-semibold tracking-wide bg-clip-text ${sidebarOpen ? 'opacity-100' : 'opacity-0'} text-transparent bg-gradient-to-r from-blue-600 to-purple-600 transition-opacity duration-700`}>
                Admin Panel
              </h2>
            </div>
          </div>
          
          <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto overflow-x-hidden">
            {menuItems.map(item => (
              <button
                key={item.id}
                className={`w-full flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 ${activeItem === item.id 
                  ? 'bg-white/20 text-red-500 shadow-lg' 
                  : 'text-black/80 hover:bg-white/10 hover:text-orange-900'}`}
                onClick={() => {setActiveItem(item.id);
                  navigate(item.path);
                }}
              >
                <span className={`flex items-center justify-center ${sidebarOpen ? 'mr-3' : 'mr-0'}`}>
                  {item.icon}
                </span>
                <span className={`font-medium transition-all ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
          
          <div className="p-3 border-t border-white/10">
            <button className="w-full flex items-center px-4 py-3.5 rounded-xl text-blue-900/80 hover:bg-white/10 hover:text-blue-900 transition-all duration-200"
                    onClick={()=>setShowConfirm(true)}>
              <span className={`flex items-center justify-center ${sidebarOpen ? 'mr-3' : 'mr-0'}`}>
                <FiLogOut size="20" />
              </span>
              <span className={`font-medium transition-all ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-white/20 backdrop-blur-xl p-6 rounded-2xl shadow-xl">
              <p className="text-white">Are you sure you want to logout?</p>
              <div className="flex justify-between gap-4 mt-4">
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer hover:scale-102 transition-all duration-200 ease-in-out" onClick={()=>
                  {
                      localStorage.removeItem('currentUser');
                      toast.info("Log-out successfully")
                      navigate('/login')
                    }
                } >Yes</button>
                <button className="px-4 py-2 bg-gray-400 rounded-lg cursor-pointer hover:scale-102 transition-all duration-200 ease-in-out" onClick={()=>setShowConfirm(false)} >No</button>
              </div>
            </div>
          </div>
        )}
    </>
  );
}

export default AdminSidebar;