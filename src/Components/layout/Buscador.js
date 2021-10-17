import React, {useState, Fragment} from 'react';
import TablaBuscador from './TablaBuscador';
import M from 'materialize-css';

import {clienteAxios} from '../../config/axios';

const Buscador = () => {

    const [termino,guardarTermino] = useState({busqueda:''});

    const [buscar,guardarBuscar] = useState(false);

    const [alimentos,guardarAlimentos] = useState([]);
    
    const {busqueda} = termino;

    const onChange = e =>{
        guardarTermino({
            ...termino,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async e=>{
        e.preventDefault();

        if(busqueda.trim() ===''){
            M.toast({html:'Ingresa el nombre de un alimento'});
            return;
        }

        try {

            const respuesta = await clienteAxios.post('api/search', {busqueda});

            if(respuesta.data.resultados[0].length === 0){
                M.toast({html:'No se encontro ningun alimento'})
            }

            guardarAlimentos(respuesta.data.resultados[0]);
            
            guardarTermino({
                ...termino,
                termino: ''
            });
            
            guardarBuscar(true);

        } catch (error) {
            
            M.toast('Hubo un error, vuelve a intentarlo');

        }

    }


    return ( 

        <Fragment>

        <div className="row container">
            <form className="col s12"
                onSubmit={onSubmit}
            >
                <div>
                    <div className="input-field col s12 m10">
                        <i className="material-icons prefix">mode_edit</i>
                        <input  type="text" 
                        className="materialize-textarea" 
                        name='busqueda' 
                        id='busqueda'
                        onChange={onChange}
                        value={busqueda}
                        />
                        <label htmlFor="busqueda">Busca tu alimento</label>
                    </div>
                    <div className='col offset-s8 s4 m2 container'>

                        <button className="btn waves-effect waves-light col s6 m6" type="submit"
                         >
                            <i className="material-icons right">send</i>
                        </button>
                        
                        {(buscar) ?
                        <button className="btn waves-effect waves-light col s6 m6" type="button" 
                        onClick={ () => guardarBuscar(false)}
                        >
                            <i className="material-icons right">close</i>
                        </button>
                            : null
                        }

                    </div>
                    
                </div>
            </form>
        </div>

        {(buscar) ? 
        <TablaBuscador
            alimentos={alimentos}
        /> : null}
        
        
        </Fragment>

     );
}
 
export default Buscador;