import {INFORMACION_USUARIO, COMIDA_ACTUAL, AGREGAR_DIETA, CALORIAS_USADAS, INFORMACION_COMIDA}  from '../../types';

export default (state,action)=>{

    switch(action.type){

        case INFORMACION_USUARIO:
            return{
                ...state,
                total: action.payload.total,
                informacion: action.payload.informacion
            }

        case COMIDA_ACTUAL:
            return{
                ...state,
                comida: action.payload
            }


        case AGREGAR_DIETA:
            return{
                ...state,
                dieta: action.payload
            }

        case CALORIAS_USADAS:
            return{
                ...state,
                consumidas: action.payload,
                restantes: state.total - action.payload

            }

        case INFORMACION_COMIDA:
            return{
                ...state,
                comidaInfo: action.payload
            }

        default: return state;

    }

}