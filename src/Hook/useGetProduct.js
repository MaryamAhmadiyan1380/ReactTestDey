import {useMutation} from 'react-query'
import {apiGetProducts} from '../Api/apiProducts'

const useGetProduct = () => {
    return useMutation({
        mutationFn:apiGetProducts
    })
}
export default useGetProduct;