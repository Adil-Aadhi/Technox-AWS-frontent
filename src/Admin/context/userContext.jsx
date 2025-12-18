import { createContext,useState,useEffect } from "react";
import axios from 'axios';
import Api from "../api/api";
import api from "../../../axiosConfig";


export const UsersContext=createContext();

export function UsersProvider({children}){
    const [userCount,setUserCount]=useState(null);
    const {users}=Api();
    const [userList,setUserList]=useState([]);
    const [orderCount,setOrderCount]=useState(null)
    const [ProductCount,setProductCount]=useState(null)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [page, setPage] = useState(1);
    const limit = 6;
    const [hasNext, setHasNext] = useState(true);
    const [loading,setLoading]=useState(false)




    const FetchData=async (pageNumber = 1)=>{

        try{
            setLoading(true)
            const res=await api.get(users,{
                params:{
                    search,status:statusFilter,
                    page: pageNumber, 
                    limit: limit
                },
            })
            setUserList(res.data.users);
            setUserCount(res.data.user_count);
            setHasNext(res.data.has_next);

            const totalOrders = res.data.users.reduce((sum, u) => sum + (u.order_count || 0),0);
            setOrderCount(totalOrders)

            const totalProducts = res.data.users.reduce((sum, u) => sum + (u.product_count || 0),0);
            setProductCount(totalProducts);
            setLoading(false)
        }
        catch(e){
            console.log("error on Fetching user",e)
            setLoading(false)
        }
    }


    useEffect(()=>{
        FetchData(page);
    },[page,search,statusFilter])

    useEffect(() => {
        setPage(1);
        }, [search, statusFilter]);


    return(
        <UsersContext.Provider value={{userList,userCount,orderCount,setUserList,ProductCount,setSearch,setStatusFilter,statusFilter,page,setPage,hasNext,loading}}>
            {children}
        </UsersContext.Provider>
    )
}