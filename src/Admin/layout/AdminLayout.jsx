import { Outlet,Navigate,} from "react-router-dom";
import AdminSidebar from "../components/sidebar";
import { SidebarProvider,SidebarContext } from "../context/sidebarContext";
import { useContext } from "react";
import { UsersProvider } from "../context/userContext";
import { ProductProvider } from "../context/productContext";
import { OrderProvider } from "../context/orderContext";


function LayoutContent(){
    const {sidebarOpens}=useContext(SidebarContext)
    return(
        <main className={`flex-1 p-6 transition-all duration-300 
  ml-0 ${sidebarOpens ? "md:ml-64" : "md:ml-20"}`}>
            <Outlet/>
        </main>
    )
}


function AdminLayout(){
    const userData = JSON.parse(localStorage.getItem("user"));


    if(!userData || userData.role!=="admin"){
        return <Navigate to="/" replace />
    }
    return(
        <SidebarProvider>
        <UsersProvider>
        <ProductProvider>
            <OrderProvider>
        <div className="admin-layout min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
                <AdminSidebar/>
                <LayoutContent />
        </div>
        </OrderProvider>
        </ProductProvider>
        </UsersProvider>
        </SidebarProvider>
    )
}
export default  AdminLayout