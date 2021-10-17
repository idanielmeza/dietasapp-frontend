import React,{Fragment} from 'react';

import Buscador from '../layout/Buscador';

import TablaComidas from './TablaComidas';

import InformacionComida from '../layout/InformacionComida';


const Comdia = () => {

    return ( 
        <Fragment>
            <Buscador/>
            <TablaComidas/>
            <InformacionComida/>
        </Fragment>
        
     );
}
 
export default Comdia;