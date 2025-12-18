function Api(){
    const users='/api/admin/users/';
    const products='/api/products/admin-products/'
    const orders='/api/order/'
    return{
        users,
        products,
        orders
    }
}

export default Api