import React,{Fragment,useContext} from 'react';

import { PaginaContext } from '../../Context/PaginaContext';

import TablaComidasListado from './TablaComidasListado';
// import Total from '../layout/Total';

const TablaComidas = () => {
    
    const {pagina} = useContext(PaginaContext);
    
    return ( 

        <Fragment>

            <div className='container'>
                <ul className="collapsible">
                <div className="collapsible-header">
                    <i className="material-icons">restaurant</i>
                    Comida 
                    {pagina}
                    </div>
                <TablaComidasListado/>
                </ul>
            </div>
        
        </Fragment>
        

     );
}
 
export default TablaComidas;
