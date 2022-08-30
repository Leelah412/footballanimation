import axios, { AxiosInstance } from 'axios';

export const authenticationDomain = 'http://localhost:4000';
export const domain = 'http://localhost:5000';

export default (): AxiosInstance=>{
    return axios.create({
        baseURL: domain
    })
}

export function authentication(): AxiosInstance{    
    return axios.create({
        baseURL: authenticationDomain
    })
}