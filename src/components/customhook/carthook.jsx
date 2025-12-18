import { useState,useEffect,useContext } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from "../useContext/cartwishContext";
import api from "../../../axiosConfig";

function useHandleCart(){

    const [cartList,setCartList]=useState([])
    const [loading, setLoading] = useState(false);
    const [cartLoading, setCartLoading] = useState(true);

    let {cartLength,setCartLength}=useContext(CartContext);

      const userData = JSON.parse(localStorage.getItem("user"));
      const userId = userData?.id;

    const ToggleCart=async(product)=>{
        if (!userId) {
        toast.error("Please login first to add to cart!");
        return;
        }
        try{
            const res = await api.get(`/api/user/cart/`);
            const exist=res.data.some(item=>item.product?.id===product.id)

            if(exist){
            toast.info(`${product.name} Already in the Cart`,{
                    className: 'custom-danger-toast'
                })
            return;
            }
            
            await api.post('/api/user/cart/',{ product: product.id })
            
            setCartList(prev=>[...prev,{ ...product, userId, quantity: 1 }]);
            setCartLength(cartList.length+1)
            toast.success(`${product.name} Added to Cart`)
        }
        catch(e){
                console.log("error on adding",e)
            }
        }
        

    const DeleteCart=(product)=>{
        api.delete(`/api/user/cart/${product.product.id}/`)
        .then(()=>{
            setCartList(prev=>prev.filter(item=>item.product.id!==product.product.id));
            setCartLength(cartList.length-1)
            toast.success(`${product.product.name} removed from Cart`,{
                    className: 'custom-success-toast'})
        })
        .catch((e)=>console.log(("error removing cart",e)))
        
    }

    const HandleCarts=()=>{
        if (!userId) return;
        setLoading(true);

        api.get(`api/user/cart/`)
        .then((res)=>{setCartList(res.data);
            setCartLength(res.data.length);
        })
        .catch((e)=>console.log("error fetching cart",e))
        .finally(() => {
            setTimeout(() => setLoading(false), 300);
        });
    }


    const IncrementQuantity = (productId) => {
    setCartList(prev => {
        const updatedCart = prev.map(item =>
            item.product.id === productId
                ? { ...item, quantity: Math.min(10, item.quantity + 1) }
                : item
        );

        const updatedItem = updatedCart.find(i => i.product.id === productId);

        api.patch(`/api/user/cart/${productId}/`, {
            quantity: updatedItem.quantity
        }).catch(err => console.log("Error increment", err));

        return updatedCart;
    });
};

 const DecrementQuantity = (productId) => {
    setCartList(prev => {
        const updatedCart = prev.map(item =>
            item.product.id === productId
                ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                : item
        );

        const updatedItem = updatedCart.find(i => i.product.id === productId);

        api.patch(`/api/user/cart/${productId}/`, {
            quantity: updatedItem.quantity
        }).catch(err => console.log("Error decrement", err));

        return updatedCart;
    });
};


    useEffect(()=>{
        HandleCarts();
    },[userId])

    return(
        {
            cartList,
            ToggleCart,
            DeleteCart,
            HandleCarts,
            IncrementQuantity,
            DecrementQuantity,
            loading,
            setLoading  ,
        }
    )
}

export default useHandleCart