import React,{useState,useContext,useEffect} from 'react';

import M from 'materialize-css';

import DietaContext from '../../Context/comida/DietaContext';

import AuthContext from '../../Context/auth/authContext';

import { PaginaContext } from '../../Context/PaginaContext';

import Agregar from './Agregar';

const Perfil = () => {

    //Extraer datos del context
    const dietaContext = useContext(DietaContext);
    const {obtenerKcal,informacion:info, total,consumidas, restantes, caloriasUsadas,dieta} = dietaContext;

    const authContext = useContext(AuthContext);
    const {cerrarSesion} = authContext;

    const {pagina} = useContext(PaginaContext);

    // const {pagina} = useContext(PaginaContext);

    const [informacion,guardarInformacion] = useState({
        edad: '',
        estatura: '',
        peso: '',
        sexo: '',
        objetivo: '',
        actividad: ''
    });

    //extraer los datos del state
    const {edad,estatura,peso,sexo,objetivo,actividad} = informacion;

    const [macros,guardarMacros] = useState({
        prote:0,
        carbos:0,
        grasa:0
    })

    const {prote,carbos,grasa} = macros;


    const handleChange = e =>{
        guardarInformacion({
            ...informacion,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e =>{
        e.preventDefault();

        if(edad === '' || estatura === '' || peso === '' || sexo === '' || objetivo === '' || actividad === ''){
            M.toast({html: 'Todos los campos son obligatorios'})
            return;
        }

        obtenerKcal(informacion);

    }

    const infoMacros = ()=>{

        let prote = 0;
        let carbos = 0;
        let grasa = 0;

        for(let i=1; i<=5 ; ++i){
            if(dieta[i]){
                dieta[i].forEach((alimento =>{
                    prote+= alimento.porcion * alimento.proteina;
                    carbos+= alimento.porcion * alimento.carbohidrato;
                    grasa+= alimento.porcion * alimento.grasa;
            
                }))
            }
        }

        guardarMacros({
            ...macros,
            prote,
            carbos,
            grasa
        });

    }


    useEffect(  () => {

        if(info.actividad){

            guardarInformacion(info);

        }
        
        

        caloriasUsadas();

        setTimeout(() => {

            M.updateTextFields();

            M.AutoInit();

            infoMacros();

        },10)
        
        


    },[info,pagina])


    return ( 

        <div className="row container">
            <form className="col s12"
                onSubmit={onSubmit}
            >
                <div className="row">
                    <div className="input-field col s12 m4">
                        <i className="material-icons prefix">elderly</i>
                        <input onChange={handleChange} name='edad' id="elderly" type="number" className="validate" value={edad}/>
                        <label htmlFor="elderly">Edad</label>
                    </div>
                    <div className="input-field col s12 m4">
                        <i className="material-icons prefix">height</i>
                        <input onChange={handleChange} name='estatura' id="height" type="number" className="validate" value={estatura}/>
                        <label htmlFor="height">Estatura</label>
                    </div>
                    <div className="input-field col s12 m4">
                        <i className="material-icons prefix">monitor_weight</i>
                        <input onChange={handleChange} name='peso' id="monitor_weight" type="number" className="validate" value={peso}/>
                        <label htmlFor="monitor_weight">Peso</label>
                    </div>
                

                    <div className="input-field col s12 m4">
                        <i className="material-icons prefix">people</i>
                        <select onChange={handleChange} name='sexo' value={  sexo !== '' ? (sexo) : '' }>
                            <option value="" disabled >Seleccionar</option>
                            <option value="h">Hombre</option>
                            <option value="m">Mujer</option>
                        </select>
                        <label>Sexo</label>
                    </div>

                    <div className="input-field col s12 m4">
                        <i className="material-icons prefix">monitor_weight</i>
                        <select onChange={handleChange} name='objetivo' value={  objetivo !== '' ? (objetivo) : '' }>
                            <option value="" disabled >Seleccionar</option>
                            <option value="-1000">Perder 1Kg / Semana</option>
                            <option value="-500">Perder 0.5Kg / Semana</option>
                            <option value="0">Mantener Peso</option>
                            <option value="+250">Aumentar Peso Lentamente</option>
                            <option value="+500">Aumentar Peso</option>
                        </select>
                        <label>Objetivo</label>
                    </div>

                    <div className="input-field col s12 m4">
                        <i className="material-icons prefix">fitness_center</i>
                        <select onChange={handleChange} name='actividad' value= {  actividad != '' ?  `${actividad}` : '' } >
                            <option value="" disabled >Seleccionar</option>
                            <option value="1.2">Poco/Nulo</option>
                            <option value="1.375">Ligero</option>
                            <option value="1.55">Moderado</option>
                            <option value="1.72">Deportista</option>
                            <option value="1.9">Atleta</option>
                        </select>
                        <label>Actividad</label>
                    </div>

                    <div>

                        <button className="btn waves-effect waves-light red darken-2 col hide-on-small-only m3" type="button" name="action"
                            onClick={()=> cerrarSesion()}
                        >Cerrar Sesion
                                <i className="material-icons right">logout</i>
                        </button>

                        <button className="btn waves-effect waves-light col hide-on-small-only offset-m6 m3 " type="submit" name="action">Guardar
                            <i className="material-icons right">send</i>
                        </button>


                        <button className="btn waves-effect waves-light col s12 hide-on-med-and-up " type="submit" name="action">Guardar
                            <i className="material-icons right">send</i>
                        </button>

                        <button className="btn waves-effect waves-light red darken-2 col s12 hide-on-med-and-up" type="button" name="action"
                            onClick={()=> cerrarSesion()}
                        >Cerrar Sesion
                                <i className="material-icons right">logout</i>
                        </button>

                        

                    </div>
                    
                    
                </div>
            </form>

            <table>
                <thead>
                <tr>
                    <th>Total</th>
                    <th>Usadas</th>
                    <th>Restantes</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>{total.toFixed(2)}</td>
                    <td>{consumidas.toFixed(2)}</td>
                    <td>{restantes.toFixed(2)}</td>
                </tr>
                </tbody>
            </table>

            <br></br>

            <table>
                <thead>
                <tr>
                    <th>Proteina</th>
                    <th>Carbohidratos</th>
                    <th>Grasas</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>{prote.toFixed(2) || 0} gr</td>
                    <td>{carbos.toFixed(2) || 0} gr</td>
                    <td>{grasa.toFixed(2) || 0} gr</td>
                </tr>
                <tr>
                    <td>{(((prote * 4)/(((prote + carbos) * 4) + (grasa * 9)))*100).toFixed(2) || 0}%</td>
                    <td>{(((carbos * 4)/(((prote + carbos) * 4) + (grasa * 9)))*100).toFixed(2) || 0}%</td>
                    <td>{(((grasa * 9)/(((prote + carbos) * 4) + (grasa * 9)))*100).toFixed(2) || 0}%</td> 
                </tr>
                </tbody>
            </table>

            <br></br>

            <Agregar/>

        </div>

     );
}
 
export default Perfil;