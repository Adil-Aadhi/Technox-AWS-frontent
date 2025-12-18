import { createContext,useEffect,useState } from "react";
import Api from "../api/api";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../../../axiosConfig";

export const ProductContext=createContext()

export function ProductProvider({children}){

    const initialValue={name:"",brand:"",price:"",type:"",storage:"",ram:"",color:"",image:"",display:"",cpu:"",description:"",status:"active",totalquantity:""}

    const [product,setProduct]=useState([]);
    const {products}=Api();
    const [addProduct,setAddProduct]=useState(initialValue)
    const [editProductId, setEditProductId] = useState(null);
    const [type,setType]=useState(null)
    const [brand,setBrand]=useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search,setSearch]=useState('')
    const [selectedProduct,setSelectedProduct]=useState(null);
    const [totalProducts,setTotalProducts]=useState(0)
    const [loading,setLoading]=useState(false)

    const FetchProduct=async(page=1)=>{
        try{
            setLoading(true)
            const res=await api.get(products,{
                params:{
                    brand: brand || undefined,
                    type: type || undefined,
                    search: search || undefined, 
                    page: page
                }
            })
            setProduct(res.data.results)
            console.log('data',res.data)
            const pages = Math.ceil(res.data.count / 12); 
            setTotalPages(pages);
            setPage(page);
            setLoading(false)

            const response=await api.get(`${products}count/`)
            console.log('data',response.data)
            setTotalProducts(response.data.Total_products)
        }
        catch(e){
            console.log("Error on fetching product",e)
            setLoading(false)
        }
        
    }


    const HideProduct=async(product)=>{
        try{
            const currentStatus = product.status;

            const newStatus=currentStatus==="hidden"?"active":"hidden"
             setProduct(prev =>
                    prev.map(p =>
                        p.id === product.id ? { ...p, status: newStatus } : p
                    )
                );

                setSelectedProduct(prev =>
                    prev && prev.id === product.id
                        ? { ...prev, status: newStatus }
                        : prev
                );

            // setHidden(newStatus);
            toast.success(currentStatus==="hidden"?"Succesfully product is Unhiddden":"The Product is Now hidden", {
        style: {
            background: "white",
            color: "black",
        }})

            const res=await api.patch(`${products}hideproduct/${product.id}/`,{
                status:newStatus
            })
            console.log("Product updated:", res.data);
           

        

        }
        catch(e){
            console.log("Error on patching hide",e)
        }
    }


    const AddProduct=async()=>{
        try{
            setLoading(true)
            const formData = new FormData();

            for (let key in addProduct) {
                formData.append(key, addProduct[key]);
            }


            const res=await api.post(`${products}addproduct/`,formData,{
                headers: { "Content-Type": "multipart/form-data" }
            })
            setLoading(false)

            toast.success("Product added successfully!", {
            style: {
                background: "white",
                color: "black",
            },
        })
        setProduct((prev) => [...prev, res.data]);
        setAddProduct(initialValue);
        }
        catch(e){
            console.log("Error on posting product", e);
        toast.error("Failed to add product", {
            style: {
                background: "white",
                color: "black",
            },
        })
        setLoading(false)
        }
    }


    const DeleteProduct=async(product)=>{
        try{
            setLoading(true)
            const newStatus="delete"
          
            const res=await api.patch(`${products}deleteproduct/${product.id}/`,{
                status:newStatus
            })

            toast.success("product succesfully deleted", {
                style: {
                    background: "white",
                    color: "black",
                }})
        
                await FetchProduct();

                setSelectedProduct(null);
                setLoading(false)

        }
        catch(e){
            console.log("Error on patching delete",e)
            setLoading(false)
        }
    }

    const EditProduct = async () => {
    try {
        const formData = new FormData();
        setLoading(true)
        for (let key in addProduct) {

            // 🟢 SPECIAL CASE: IMAGE FIELD
            if (key === "image") {

                // Only append if a NEW FILE was selected
                if (addProduct.image instanceof File) {
                    formData.append("image", addProduct.image);
                }

                // Skip sending null, undefined, or string URLs
                continue;
            }

            // 🟢 Normal fields
            if (addProduct[key] !== "" && addProduct[key] !== null) {
                formData.append(key, addProduct[key]);
            }
        }

        const res = await api.patch(
            `${products}addproduct/${editProductId}/`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

        setProduct(prev =>
            prev.map(p => (p.id === editProductId ? res.data : p))
        );
        setLoading(false)

        toast.success("Product updated successfully!", {
            style: { background: "white", color: "black" }
        });

        setAddProduct(initialValue);
        setEditProductId(null);

    } catch (e) {
        console.log("Error on edit product", e);
        toast.error("Failed to update product", {
            style: { background: "white", color: "black" }
        });
        setLoading(false)
    }
};


    useEffect(()=>{
        FetchProduct(1)
    },[brand,type,search])

    return(
        <ProductContext.Provider value={{product,HideProduct,setAddProduct,addProduct,AddProduct,DeleteProduct,setEditProductId,EditProduct,editProductId,type,setType,brand,setBrand,FetchProduct,page,totalPages,setSearch,setSelectedProduct,selectedProduct,totalProducts,loading}}>
            {children}
        </ProductContext.Provider>
    )
}