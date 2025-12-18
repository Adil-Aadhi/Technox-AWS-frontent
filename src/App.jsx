  import './App.css'
  import Navbar from './components/navbar'
  import Register from './components/register'
  import {Routes,Route} from 'react-router-dom'
  import Login from './components/login'
  import Home from './components/home'
  import { useLocation } from 'react-router-dom';
  import { useEffect, useState } from 'react';
  import Footer from './components/footer'
  import Products from './components/ProductsPage'
  import Wishlist from './components/wishlist'
  import Cart from './components/cart'
  import { ToastContainer,Slide } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import SingleProduct from './components/singleproduct'
  import Profile from './pages/profile'
  import Payment from './pages/payment'
  import QRPayment from './pages/qrcode.jsx'
  import AboutPage from './pages/about.jsx'
  import NotFound from './pages/notfound.jsx'
  import { CartProvider } from './components/useContext/cartwishContext.jsx'
  import AdminLayout from './Admin/layout/AdminLayout.jsx'
  import Dashboard from './Admin/pages/dashboard.jsx'
  import { useNavigate } from 'react-router-dom'
  import AdminUser from './Admin/pages/AdminUser.jsx'
  import AdminProducts from './Admin/pages/AdminProducts.jsx'
  import AdminOrders from './Admin/pages/AdminOrders.jsx'
import UserLayout from './route/UserRoute.jsx'
import SoftDeletedProducts from './Admin/pages/AdminDeletedOrder.jsx'


  function App() {

    const location = useLocation();
    const [showNavbar, setShowNavbar] = useState(true);
    const [showFooter,setShowFooter] = useState(true);
    const navigate = useNavigate();



    useEffect(()=>{
      const hideOnRoutes = ['/login', '/register','/payment','/qrcode','/admin'];
      const shouldHide =hideOnRoutes.includes(location.pathname) || location.pathname.startsWith('/admin');
      setShowNavbar(!shouldHide)
      setShowFooter(!shouldHide)
      const userData = JSON.parse(localStorage.getItem("currentUser"));
      if (userData?.role === "admin" && location.pathname === "/") {
        navigate("/admin", { replace: true });
      }
    },[location,navigate])

    return (
      <div className="overflow-x-hidden max-w-[100vw]">
        <CartProvider>
      {showNavbar  && <Navbar />}
      <Routes>
        <Route element={<UserLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/wishlist" element={<Wishlist/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/products/:id" element={<SingleProduct/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/payment" element={<Payment/>}/>
          <Route path="/qrcode" element={<QRPayment/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Route>
        <Route path='/admin'element={<AdminLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="users" element={<AdminUser/>}/>
          <Route path="products" element={<AdminProducts/>}/>
          <Route path="orders" element={<AdminOrders/>}/>
          <Route path="deleted-product" element={<SoftDeletedProducts/>}/>
        </Route>
      </Routes>
      {showFooter && <Footer/>}
    <ToastContainer
    position="top-center"
    autoClose={3000}
    hideProgressBar
    newestOnTop
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable={false}
    pauseOnHover
    transition={Slide}
    toastStyle={{
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      color: 'white',
      padding: '16px',
      margin: '8px 0',
      overflow: 'hidden',
      position: 'relative'
    }}
    bodyStyle={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      margin: 0,
      padding: 0
    }}
    
  />
  </CartProvider>
      </div>
    )
  }

  export default App
