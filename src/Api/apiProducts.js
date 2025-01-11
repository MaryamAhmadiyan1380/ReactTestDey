import http from './httpServices'

const urlProducts = " https://api.escuelajs.co"


export const apiGetProducts = async (input) => {
    try {
        const response = await http.get(`${urlProducts}/api/v1/products`, input)
        return response.data;
    }


    catch (error) {
        console.error("error", error)
    }
}
export const apiDeleteProduct = async(productID) => {
    try{
        const response = await http.delete(`${urlProducts}/api/v1/products/${productID}`)
        return response.data
    }
    catch(error){
        console.error(" Delete Product Error is: ",error)
    }
}
export const apiEditProduct = async(productID,updatedData) => {
    try{
        const response = await http.put(`${urlProducts}/api/v1/products/${productID}`,updatedData)
        return response.data
    }
    catch(error){
        console.error("Edit Product Error is:",error)
    }
}
export const apiPostProduct = async(addData) => {
    try{
        const response = await http.post(`${urlProducts}/api/v1/products/`,addData)
        return response.data;
    }
    catch(error){
        console.error("Error adding product:",error)
    }
}
