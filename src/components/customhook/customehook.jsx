import { useState,useEffect,useContext } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from "../useContext/cartwishContext";
import api from "../../../axiosConfig"


function useWishList(){

    const [wishlist,setWishlist]=useState([])
    const [loading, setLoading] = useState(true);
    const {wishLength,setWishLength}=useContext(CartContext)

    const userData = JSON.parse(localStorage.getItem('user'));


    const ToggleWishList= async (product)=>{

        if(!userData || !userData.isLoggedIn){
            toast.error("Please login first to use wishlist!");
            return;
        }

        try{
            
            const exist=wishlist.some(item=>item.product.id===product.id);

            if(exist){
                await api.delete(`/api/user/wishlist/${product.id}/`)
                setWishlist(prev=>prev.filter(item=>item.product.id!==product.id));
                setWishLength(wishlist.length-1)
                toast.success(`${product.name} removed from wishlist`,{
                    className: 'custom-success-toast'
                })
            }
            else{
                await api.post('/api/user/wishlist/',{product:product.id});
                HandleWishlist();
                // setWishlist(prev=>[...prev,product])
                // setWishLength(wishlist.length+1)
                toast.success(`${product.name} added to wishlist!`,{
                })
            }
        }
        catch(e){
            console.log("error update",e)
             toast.error(`Failed to update wishlist: ${e.message}`);
        }
    }

    const HandleWishlist=()=>{

        if(!userData || !userData.isLoggedIn || !userData.id) {
            setLoading(false);
            return;}

        setLoading(true);

        api.get(`/api/user/wishlist/${userData.id}/`)
        .then((res)=>{setWishlist(res.data);
            setWishLength(res.data.length)
        })
        .catch((e)=>{console.log("error fetching",e)
            toast.error('Failed to load wishlist')})
        .finally(() => {
                setLoading(false);
            });
    }

    useEffect(()=>{
        HandleWishlist();
    },[userData?.id])

   

    return({
        wishlist,
        ToggleWishList,
        loading}
    )
    
}

export default useWishList;
