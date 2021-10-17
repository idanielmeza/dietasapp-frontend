import React,{useReducer} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {clienteAxios, tokenAuth} from '../../config/axios';

import {REGISTRO_EXITOSO, LOGIN_EXITOSO, LOGIN_ERROR, CERRAR_SESIONS} from '../../types';

import M from 'materialize-css';

const AuthState = props => {

    const initialState = {

        token: localStorage.getItem('user-token'),
        autenticado: null,
        usuario: null,
        cargando: true

    };

    const [state,dispatch] = useReducer(AuthReducer,initialState);    

    const registrarUsuario = async datos =>{

        try {
            
            const respuesta = await clienteAxios.post('/api/usuario', datos);
            console.log(respuesta.data.token);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });

        } catch (error) {
            dispatch({
                type: LOGIN_ERROR
            })
            M.toast({html: `${error.response.data.errors[0].msg}`})
        }
    }

    const iniciarSesion = async datos =>{

        try {

            const respuesta = await clienteAxios.post('/api/auth/login', datos);

            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })

            
        } catch (error) {

            dispatch({
                type: LOGIN_ERROR
            })

            M.toast({html: `${error.response.data.msg}`})
        }

    }

    const obtenerUsuario = async ()=>{

        const token = localStorage.getItem('user-token');
        if(token){
           //FUNCION PARA ENVIAR EL TOKEN POR HEADERs
           tokenAuth(token);
        }
        try {   
            const respuesta = await clienteAxios.get('/api/usuario');

            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });
            
            return respuesta.data.usuario;

        } catch (error) {
            console.log(error);
            dispatch({
                types:LOGIN_ERROR
            })
        }

    }

    const cerrarSesion = ()=>{

        delete clienteAxios.defaults.headers.common['user-token'];

        dispatch({
            type: CERRAR_SESIONS
        })


    }

    return(

        <AuthContext.Provider
            value={{
                autenticado: state.autenticado,
                usuario: state.usuario,
                registrarUsuario,
                iniciarSesion,
                obtenerUsuario,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
        
    )

}

export default AuthState;