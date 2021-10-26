import React,{useContext, useEffect, useState} from 'react';
import DietaContext from '../../Context/comida/DietaContext';

import {PaginaContext} from '../../Context/PaginaContext';

import M from 'materialize-css';

const TablaComidasListado = () => {


    const dietaContext = useContext(DietaContext);
    const {comida, borrarAlimento, actualizarAlimento} = dietaContext;

    const {pagina} = useContext(PaginaContext);


    const handleAlimento = e=>{
        actualizarAlimento(e.target.value,e.target.name);
    }

    useEffect(() => {
        
        setTimeout(()=>{

            M.AutoInit();
            M.updateTextFields();

        },10)
        
        

    },[comida, pagina]);

    if(!comida) return null;

    return ( 
                
        comida.map(alimento=>{

                return(
                    
                <li key={`${pagina}${alimento._id}${Math.random(5)}`} name='alimento'>

                    <div className="collapsible-header row" style={{margin:'.5rem', padding:'0 0'}}>
                        <div className='col s12 row' style={{marginBottom:'0.5rem'}}>

                            <div className='col s12 m10'  >
                                <p className='col s7 m4'>
                                {alimento.nombre} / {alimento.gramo * alimento.porcion}{(alimento.ml) ? <span>ml</span> : <span>gr</span>}
                                </p>

                                <p className='col hide-on-small-only m4'>
                                    {(alimento.porcion * ((alimento.proteina * 4) + (alimento.carbohidrato*4) + (alimento.grasa * 9))).toFixed(2)} kcal
                                </p>
                                <div className="input-field col s5 m4" style={{marginBottom:'0', paddingBottom:'0'}}>
                                    <i className="material-icons prefix">confirmation_number</i>
                                    <input name={alimento._id} id="icon_prefix" type="number" defaultValue={(alimento.porcion)}
                                     onBlur={handleAlimento}
                                     />
                                    <label htmlFor="icon_prefix">x{`${alimento.gramo}`} {(alimento.ml) ? <span>ml</span> : <span>gr</span>}</label>
                                </div>
                                
                            </div>

                            <div className='col s12 m2 right-align'>
                                <button className="btn waves-effect waves-light" type="button" 
                                onClick={ ()=> borrarAlimento(alimento._id) }
                                >
                                    <i className="material-icons right">delete_outline</i>
                                </button>
                            </div>

                        </div>
                        

                    </div>
                    <div className="collapsible-body row center-align"><span>

                            <p className='col s12 hide-on-med-and-up'>{(alimento.porcion * (((alimento.proteina * 4) + (alimento.carbohidrato*4) + (alimento.grasa * 9)))).toFixed(2)} kcal</p>
                            <p className='col s12 m4'>Proteina: {(alimento.porcion * alimento.proteina).toFixed(2)} gr </p>
                            <p className='col s12 m4'>Carbohidratos: {(alimento.porcion * alimento.carbohidrato).toFixed(2)} gr </p>
                            <p className='col s12 m4'>Grasas: {(alimento.porcion * alimento.grasa).toFixed(2)} gr </p>

                        </span></div>
                    
                </li>)
            })
        
        
     );
}
 
export default TablaComidasListado;