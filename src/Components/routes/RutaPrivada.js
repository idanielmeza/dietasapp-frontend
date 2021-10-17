import React,{useContext,useEffect} from 'react';
import {Route,Redirect} from 'react-router-dom';
import AuthContext from '../../Context/auth/authContext';
import ComidaContext from '../../Context/comida/DietaContext';

const RutaPrivada = ({component: Component, ...props}) => {


    const authContext = useContext(AuthContext);
    const {autenticado, cargando, obtenerUsuario} = authContext;

    const comidaContext = useContext(ComidaContext);
    const {agregarUsuario} = comidaContext;

    useEffect(async() => {
        
        const usuario = await obtenerUsuario();
        if(usuario){
            agregarUsuario(usuario);
        }
        

        // eslint-disable-next-line
    },[autenticado])


    return ( 

        <Route {...props} render={props => !autenticado && !cargando?(
            <Redirect to='/login'/>
        ) : (
            <Component {...props}/>
        ) }
        />

     );
}
 
export default RutaPrivada;