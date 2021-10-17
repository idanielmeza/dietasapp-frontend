import React,{useEffect,useContext} from 'react';

import DietaContext from '../../Context/comida/DietaContext';

import M from 'materialize-css';

const TablaBuscador = ({alimentos}) => {

    const dietaContext = useContext(DietaContext);
    const {agregarAlimento} = dietaContext;
    
    useEffect(() => {
        M.AutoInit();
       },[]);

    if(alimentos.length === 0){return null};

     return( 
        <div className='container'>

            <ul className="collapsible">
            {
                alimentos.map(alimento=>{
                    return(
                    <li key={alimento._id} name='alimento'>

                        <div className="collapsible-header row" style={{margin:'0.5rem', padding:'0 0'}}>
                            <div className='col s12 row'>

                                <div className='col s6 m10'>
                                    <p className='col s4 m4'>
                                    {alimento.nombre}
                                    </p>
                                    <p className='col hide-on-small-only m4'>
                                    {alimento.gramo} {(alimento.ml) ? <span>ml</span> : <span>gr</span>}
                                    </p>
                                    <p className='col s12 m4'>
                                        {((alimento.proteina * 4) + (alimento.carbohidrato*4) + (alimento.grasa * 9)).toFixed(2)} kcal
                                    </p>
                                    
                                </div>

                                <div className='col s6 m2 right-align'>
                                    <button className="btn waves-effect waves-light" type="button"  
                                    onClick={ ()=> agregarAlimento(alimento) }
                                    >
                                        <i className="material-icons right">add_circle</i>
                                    </button>
                                </div>

                            </div>
                            

                        </div>
                        <div className="collapsible-body row center-align"><span>

                                <p className='col s12 hide-on-med-and-up'>Porcion: {alimento.gramo} {(alimento.ml) ? <span>ml</span> : <span>gr</span>}</p>
                                <p className='col s12 m4'>Proteina: {alimento.proteina} gr </p>
                                <p className='col s12 m4'>Carbohidratos: {alimento.carbohidrato} gr </p>
                                <p className='col s12 m4'>Grasas: {alimento.grasa} gr </p>

                            </span></div>
                        
                    </li>)
                })
                }
            </ul>
        </div>
        

     );
}
 
export default TablaBuscador;