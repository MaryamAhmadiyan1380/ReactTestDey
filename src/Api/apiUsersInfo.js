import http from '../Api/httpServices'

const urlUser = "https://api.escuelajs.co"

export const apiGetUserInfo = async(info) => {
    try{
        const response = await http.get(`${urlUser}/api/v1/users`,info );
        return response.data;
    }
    catch(error){
        console.log("Response User Error is: ", error);
        throw error;
    }
   
}
export const apiEditUserInfo = async(userId,updatedData) => {
    try{
        const response = await http.put(`${urlUser}/api/v1/users/${userId}`,updatedData)
        return response.data;
    }
    catch(error){
        console.error("Edit User Error is:",error)
    }
}
export const apiPostUSerInfo = async(addData) =>{
    try{
        const response = await http.post(`${urlUser}/api/v1/users/`,addData)
        return response.data
    }
    catch(error){
        console.error("Error adding user:",error)

    }
}
