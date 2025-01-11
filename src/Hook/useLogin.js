import {useMutation} from 'react-query'

import {apiLogin} from '../Api/apiLogin'

 const useLogin = () => {
    return useMutation({
        mutationFn:apiLogin
    })
 }
export default useLogin;