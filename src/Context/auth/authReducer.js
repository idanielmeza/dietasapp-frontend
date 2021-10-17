import {REGISTRO_EXITOSO, LOGIN_EXITOSO, LOGIN_ERROR, CERRAR_SESIONS} from '../../types';

export default (state,action)=>{

    switch(action.type){

        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO:
            localStorage.setItem('user-token', action.payload.token)
            return{
                ...state,
                token: action.payload.token,
                usuario: action.payload.usuario,
                autenticado: true,
                cargando: false
            }

            case CERRAR_SESIONS:
            case LOGIN_ERROR:
                localStorage.removeItem('user-token');
                return{
                    ...state,
                    token: null,
                    usuario: null,
                    autenticado: null,
                    cargando: false
                }

        default: return state;

    }

}