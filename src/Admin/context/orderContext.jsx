import { createContext,useState,useEffect } from "react";
import Api from "../api/api";
import axios from "axios";
import api from "../../../axiosConfig";


export const OrderContext=createContext()

export function OrderProvider({children}){

    const {orders}=Api()
    const [order,setOrder]=useState([])
    const [statusCount,setStatusCount]=useState({})
    const [totalOrder,setTotalOrder]=useState('')
    const [revenue,setRevenue]=useState([])
    const [statusFilter, setStatusFilter] = useState("");
    const [topProducts, setTopProducts] = useState([]);
    const [search,setSearch]=useState('');
    const [page, setPage] = useState(1);
    const limit = 6;   
    const [hasNext, setHasNext] = useState(true);
    const [loading,setLoading]=useState(false)


    const HandleOrders=async(pageNumber = 1)=>{
        try{
          setLoading(true)
            const res=await api.get(`${orders}admin-orders/`,{
              params:{
                search:search,
                statusFilter:statusFilter,
                page: pageNumber,  
                limit: limit
              }
            })
            setOrder(res.data.orders)
            setStatusCount(res.data.status_counts)
            setTotalOrder(res.data.total_order_count)
            setLoading(false)
            setHasNext(res.data.has_next);
            setPage(pageNumber);
        }catch(e){
            console.log("Error on fetching orders",e)
            setLoading(false)
        }
        
    }

    const HandleOrderStatus=async(orderOdr,newStatus)=>{
        try{
            await api.patch(`${orders}admin-orders/${orderOdr}/`,{
              status:newStatus});

            setOrder(prev=>prev.map(o=>o.order_id===orderOdr ? {...o,status:newStatus}:o))

            console.log("Order status updated successfully!");
        }catch(e){
            console.log("Error on updating Status",e)
        }
    }

    useEffect(() => {
    if (order.length > 0) {
        const revenue = order
            .filter(x=>x.status !=="Cancelled")
            .reduce((acc, x) => acc + Number(x.amount || 0), 0);

        setRevenue(revenue.toLocaleString("en-IN", { style: "currency", currency: "INR" }));
        console.log("Updated total revenue:", revenue);
    }
    }, [order]);


    //gpt//

    const [revenueData, setRevenueData] = useState([]);

useEffect(() => {
  if (order.length > 0) {
    // ✅ Filter out cancelled orders
    const validOrders = order.filter(x => x.status !== "Cancelled");

    // ✅ Group by date
    const grouped = validOrders.reduce((acc, o) => {
    // ✅ SAFE DATE (no timezone shift)
    const date = o.date.split("T")[0]; // YYYY-MM-DD

    acc[date] = (acc[date] || 0) + Number(o.amount || 0);
    return acc;
  }, {});


    // ✅ Convert to array for chart
    const chartData = Object.keys(grouped)
    .sort((a, b) => new Date(a) - new Date(b))
    .map(d => ({
      date: new Date(d).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short"
      }),
      revenue: grouped[d]
    }));

    setRevenueData(chartData);
    console.log("Revenue chart data:", chartData);
  }
  console.log("RAW orders:", order);
  console.log("FINAL chart data:", revenueData);
}, [order]);


useEffect(() => {
  if (order.length > 0) {
    // Count products
    const productCount = {};

    order.forEach(ord => {
      (ord.products || []).forEach(prod => {
        productCount[prod.product.name] = (productCount[prod.product.name] || 0) + 1;
      });
    });

    // Convert to array for BarChart
    const chartData = Object.keys(productCount).map(name => ({
      name,
      orders: productCount[name],
    }));

    setTopProducts(chartData);
    console.log("Top Products (by orders):", chartData);
  }
}, [order]);

//...gpt...//

const formatDate = (utcDate) => {
  return new Date(utcDate).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
};


    useEffect(()=>{
        HandleOrders(page);
    },[page,statusFilter,search])

    useEffect(() => {
        setPage(1);
      }, [search, statusFilter]);

    return(
        <OrderContext.Provider value={{order,HandleOrders,HandleOrderStatus,revenue,revenueData,topProducts,setStatusFilter,statusFilter,setSearch,search,statusCount,totalOrder,formatDate,page,setPage,hasNext,loading }}>
            {children}
        </OrderContext.Provider>
    )
}