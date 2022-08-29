import axios, { AxiosInstance } from 'axios';

const authenticationDomain = 'http://localhost:4000';
const basicDomain = 'http://localhost:5000';

export default (): AxiosInstance=>{
    return axios.create({
        baseURL: basicDomain
    })
}

export function authentication(): AxiosInstance{
    var domain = authenticationDomain;
    
    return axios.create({
        baseURL: domain
    })
}