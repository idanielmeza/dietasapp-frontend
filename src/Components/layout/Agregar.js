import React,{useState,Fragment} from 'react'
import M from 'materialize-css';

import {clienteAxios} from '../../config/axios';

const Agregar = () => {

    const [alimento,guardarAlimento] = useState({
        nombre: '',
        proteina: '',
        carbohidrato: '',
        grasa: '',
        gramo: '',
        ml: 'false'
    });

    const {nombre,
        proteina,
        carbohidrato,
        grasa,
        gramo,
        ml}= alimento;

    const onChange = e=>{

        guardarAlimento({
            ...alimento,
            [e.target.name]: e.target.value
        })

    }

    const onSubmit = e=>{
        e.preventDefault();

        if( nombre === '' ||
            proteina === '' ||
            carbohidrato === '' ||
            grasa === '' ||
            gramo === '' ||
            ml === ''){
                M.toast({html:'Todos los campos son obligatorios'})
                return;
            }
            
        peticion();
    }

    const peticion = async()=>{
        const al = alimento;
            al.ml = JSON.parse(al.ml);

        try {

            const respuesta =await clienteAxios.post('/api/alimentos', al);

            console.log(respuesta);

            guardarAlimento({
                ...alimento,
                nombre: '',
                proteina: '',
                carbohidrato: '',
                grasa: '',
                gramo: '',
                ml: 'false'
            })
            
            M.toast({html: `Se ha agregado el alimento ${al.nombre}`});

        } catch (error) {
            console.log(error);
            M.toast({html: `Hubo un error, vuelve a intentarlo`})

        }
    }


    return ( 


        <Fragment>

        <nav className="container">
                <div className="nav-wrapper teal">
                <p href="#!" className="center">Crea un nuevo alimento</p>
                </div>
        </nav>

        <div className="container">

            <div className="row">
                <form className="col s12" onSubmit={onSubmit}>
                    <div className="row">
                            <div className="input-field col s12">
                            <input name='nombre' id="icon_prefix" type="text" className="validate" onChange={onChange} value={nombre}/>
                            <label htmlFor="icon_prefix">Nombre</label>
                            </div>
                            <div className="input-field col s12">
                            <input name='proteina' id="proteina" type="number" className="validate" onChange={onChange} value={proteina}/>
                            <label htmlFor="proteina">Proteina</label>
                            </div>
                            <div className="input-field col s12">
                            <input name='carbohidrato' id="carbohidrato" type="number" className="validate" onChange={onChange} value={carbohidrato}/>
                            <label htmlFor="carbohidrato">Carbohidratos</label>
                            </div>
                            <div className="input-field col s12">
                            <input name='grasa' id="grasa" type="number" className="validate" onChange={onChange} value={grasa}/>
                            <label htmlFor="grasa">Grasa</label>
                            </div>
                            <div className="input-field col s12">
                            <input name='gramo' id="gramo" type="number" className="validate" onChange={onChange} value={gramo}/>
                            <label htmlFor="gramo">Porcion</label>
                            </div>

                            <div className="input-field col s12">
                                <select onChange={onchange} name='ml' value={ml}>
                                    <option value="false">gr</option>
                                    <option value="true">ml</option>
                                </select>
                                <label>Medida</label>
                            </div>

                    </div>

                    <div className="row">
                        <button className="btn waves-effect waves-light col s12 m2 offset-m10" type="submit" name="action">Agregar
                            <i className="material-icons right">send</i>
                        </button>
                    </div>
                 </form>
            </div>

            </div>

            </Fragment>
     );
}
 
export default Agregar;