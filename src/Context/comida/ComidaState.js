import React,{useContext,useReducer, useEffect} from 'react';

import {clienteAxios} from '../../config/axios';

import DietaContext from './DietaContext';
import DietaReducer from './ComidaReducer';

import {PaginaContext} from '../PaginaContext';

import {INFORMACION_USUARIO, COMIDA_ACTUAL, AGREGAR_DIETA, CALORIAS_USADAS, INFORMACION_COMIDA}  from '../../types';

import M from 'materialize-css';

const DietaState = props => {

    //Extraer context de pagina
    const {pagina} = useContext(PaginaContext);

    const initialState = {
        informacion: {
            edad: '',
            estatura: '',
            peso: '',
            sexo: '',
            objetivo: '',
            actividad: ''
        },
        dieta:{
            1: [],
            2: [],
            3: [],
            4: [],
            5: []
        },
        comida:[],
        total: 0,
        consumidas: 0,
        restantes: 0,
        comidaInfo:{prote: 0,
            carbos: 0,
            grasa: 0,
            kcal: 0}
    }

    const [state,dispatch] = useReducer(DietaReducer,initialState);

    const obtenerKcal = async informacion =>{

        try {

            const datos = informacion;

            await clienteAxios.put('/api/usuario',datos);

            const total = generarTotal(informacion);
            
            const payload = {
                total,
                informacion
            }
    
            dispatch({
                type: INFORMACION_USUARIO,
                payload
            })

        } catch (error) {
            
            M.toast({html:'Hubo un error vuelve a intentarlo'})

        }
    }

    const generarTotal = informacion =>{

        const {edad,estatura,peso,sexo,objetivo,actividad} = informacion;

        let total = 0;

        if(sexo === 'h'){
            const tmb = 66 + (13.7 * Number(peso)) + (5 * Number(estatura)) - (6.75 * Number(edad));
            total = tmb * Number(actividad) + Number(objetivo);
        }else if(sexo === 'm'){
            const tmb = 655 + (9.6 * Number(peso)) + (1.8 * Number(estatura)) - (4.7 * Number(edad));
            total = tmb * Number(actividad) + Number(objetivo);
        }

        return total;

    }

    const agregarUsuario = usuario =>{

        const {edad,estatura,peso,sexo,objetivo,actividad, comida} = usuario;

        const informacion = {edad,estatura,peso,sexo,objetivo,actividad};

        const total = generarTotal(informacion);

        const payload = {
            total,
            informacion
        }

        dispatch({
            type: INFORMACION_USUARIO,
            payload
        })

        if(comida){
            dispatch({
                type: AGREGAR_DIETA,
                payload: JSON.parse(comida)
            })
        }
        

    }

    const comidaActual = ()=>{


        if(pagina ===0)return;

        if( state.dieta[`${pagina}`].lenght === 0){
            return;
        }

        const comida = state.dieta[`${pagina}`];

        dispatch({
            type: COMIDA_ACTUAL,
            payload: comida
        });

        caloriasUsadas();

        caloriasComida();

        

    }

    const caloriasUsadas = ()=>{

        let prote = 0;
        let carbos = 0;
        let grasa = 0;

        for(let i=1; i<=5 ; ++i){
            if(state.dieta[i]){
                state.dieta[i].forEach((alimento =>{
                    prote+= alimento.porcion * alimento.proteina;
                    carbos+= alimento.porcion * alimento.carbohidrato;
                    grasa+= alimento.porcion * alimento.grasa;
            
                }))
            }
        }

        const kcal = Number(((grasa * 9) + ((carbos+prote) * 4)).toFixed(2));
        
        dispatch({
            type: CALORIAS_USADAS,
            payload: kcal
        })

        // M.toast({html:`${(state.total-state.usadas).toFixed(2)} kcal restantes`})

        if(state.consumidas > state.total){
            M.toast({html:'Has excedido la cantidad de calorias'})
        }

    }

    const agregarAlimento = async alimento =>{

        alimento.porcion = 1;

        let existe = false;
        
        let alimentos = state.dieta[pagina];

        alimentos.forEach(comida=>{
            if(comida._id === alimento._id){
                M.toast({html:`El alimento ${comida.nombre} ha sido agregado anteriormente.`})
                return;
        }});

        if(!existe){
            alimentos=[...alimentos,alimento];
        }
        
        try {
            
            

            const comida = state.dieta;
            comida[pagina] = alimentos;

            await clienteAxios.put('api/usuario/comida', {comida});

            dispatch({
                type: AGREGAR_DIETA,
                payload: comida
            })

            comidaActual();

        } catch (error) {

            console.log(error);

            M.toast({html:'Hubo un error'});
        }

        caloriasUsadas();
    }

    const borrarAlimento = async id =>{

        const comida = state.dieta;

        const alimentos = comida[pagina].filter(alimento => alimento._id !== id);
        
        comida[pagina] = alimentos;

        try {
            
            await clienteAxios.put('/api/usuario/comida',{comida});

            dispatch({
                type: AGREGAR_DIETA,
                payload: comida
            })

            comidaActual();
            
        } catch (error) {
            M.toast({html:'Hubo un error, vuelve a intentarlo'})
        }

    }
    
    const actualizarAlimento = async (cantidad,id) =>{

        const alimentos = state.comida;
        if(cantidad == 0 || ''){
            borrarAlimento(id);
            return;
        }

        alimentos.forEach((alimento=>{
            if(alimento._id == id){
                alimento.porcion = Number(cantidad);
            }
        }));

        const comida = state.dieta;
        comida[pagina] = alimentos;

        try {

            await clienteAxios.put('/api/usuario/comida',{comida});

            dispatch({
                type: AGREGAR_DIETA,
                payload: comida
            })

            comidaActual();
            M.updateTextFields();

            
        } catch (error) {
            
            M.toast({html: 'Hubo un error,vuelve a intentarlo'})

        }




    }

    const caloriasComida = ()=>{

        let prote = 0;
        let carbos = 0;
        let grasa = 0;

        state.comida.forEach(alimento =>{
            prote+= alimento.porcion * alimento.proteina;
            carbos+= alimento.porcion * alimento.carbohidrato;
            grasa+= alimento.porcion * alimento.grasa;
        })

        const kcal = Number(((grasa * 9) + ((carbos+prote) * 4)).toFixed(2));

        const comidaInfo = {
            prote,
            carbos,
            grasa,
            kcal
        }

        dispatch({
            type: INFORMACION_COMIDA,
            payload: comidaInfo
        })

    }

    useEffect(()=>{

        comidaActual();

    },[pagina])



    return (<DietaContext.Provider
            value={{
                informacion: state.informacion,
                total: state.total,
                consumidas: state.consumidas,
                dieta: state.dieta,
                comida: state.comida,
                comidaInfo: state.comidaInfo,
                restantes: state.restantes,
                obtenerKcal,
                agregarUsuario,
                agregarAlimento,
                borrarAlimento,
                actualizarAlimento,
                caloriasUsadas
            }}
        >
            {props.children}
        </DietaContext.Provider>);
}
 
export default DietaState;