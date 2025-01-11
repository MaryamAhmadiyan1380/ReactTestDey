import {useMutation} from 'react-query'

import {apiSignup} from '../Api/apiSignup'

 const useSignup = () => {
    return useMutation({
        mutationFn:apiSignup
    })
 }
export default useSignup;
