import Axios from "axios";

const httpServices={
    get : Axios.get,
    post : Axios.post,
    put : Axios.put,
    delete : Axios.delete
}
export default httpServices;