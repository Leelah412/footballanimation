import axios from 'axios';

const authenticationDomain = 'http://localhost:4000';
const basicDomain = 'http://localhost:5000';

export default (urlOnly = false)=>{
    var domain = basicDomain;

    if(urlOnly) return domain;
    
    return axios.create({
        baseURL: domain
    })
}

export function authentication(){
    var domain = authenticationDomain;
    
    return axios.create({
        baseURL: domain
    })
}