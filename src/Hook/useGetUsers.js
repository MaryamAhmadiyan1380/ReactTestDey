import {useMutation} from 'react-query';
import {apiGetUserInfo} from '../Api/apiUsersInfo';

const useGetUsers = () => {
    return useMutation({
        mutationFn:apiGetUserInfo
    })
}
export default useGetUsers;

