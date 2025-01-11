import http from './httpServices';

const urlFake = "https://fakeapi.platzi.com"

export const apiFakeClasses = async(token) => {
    const response = await http.get(`${urlFake}/en/rest/users/#create-a-user`)
    return response.data.token
}