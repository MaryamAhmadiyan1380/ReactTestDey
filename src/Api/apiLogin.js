 import http from '../Api/httpServices'
 
 const urlLogin = "https://api.escuelajs.co"
 
 export const apiLogin = async(addData) => {
    try{
        const response = await http.post(`${urlLogin}/api/v1/auth/login`,addData)
        return response.data;
    }
    catch(error){
        console.error("Error Login:",error)
    }
}

