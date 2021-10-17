import React,{useEffect,useContext, Fragment} from 'react'

import { PaginaContext } from '../Context/PaginaContext';

import M from 'materialize-css';

import Header from './layout/Header'
import Perfil from './layout/Perfil'
import Comida from './comidas/Comida'


const Incio = () => {

    const {pagina} = useContext(PaginaContext);

    useEffect(()=>{

        M.AutoInit();
        M.updateTextFields();

    },[pagina])



    return ( 

        <Fragment>
            <Header/>
            {(pagina === 0) ? <Perfil /> : 
            <Comida/>
            }
            
        </Fragment>
     );
}
 
export default Incio;