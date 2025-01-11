import {useMutation} from 'react-query';
import {apiGetCategories} from '../Api/apiCategories'

const useGetCategories = () => {
    return useMutation({
        mutationFn:apiGetCategories
    })
}
export default useGetCategories;