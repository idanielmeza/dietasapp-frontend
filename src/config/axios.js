import axios from 'axios';

export const clienteAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || window.location.href
    // baseURL: window.location.href
});

export const tokenAuth = token => {
    if(token){
        clienteAxios.defaults.headers.common['user-token'] = token
    }else{
        delete clienteAxios.defaults.headers.common['user-token'];
    }
};

