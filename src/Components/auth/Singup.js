import React,{Fragment, useEffect,useState,useContext} from 'react';
import {Link} from 'react-router-dom';
import M from 'materialize-css';
import AuthContext from '../../Context/auth/authContext';


const Singup = (props) => {

    //Extraer valores del context
    const authContext = useContext(AuthContext);
    const {registrarUsuario,autenticado} = authContext;


    //En caso de que el usuario se haya autenticado
    useEffect(()=>{

        if(autenticado){
            props.history.push('/');
        }
        // eslint-disable-next-line
    },[autenticado, props.history])

    // Definir state para inicar sesion 

    const [usuario,guardarUsuario] = useState({
        nombre:'',
        correo: '',
        password: '',
        confirmar: ''
    });

    const {nombre,confirmar,correo,password} = usuario;

    const onChange = (e)=>{

        guardarUsuario({...usuario,
            [e.target.name]: e.target.value
        })

    }

    const onSubmit = (e)=>{
        e.preventDefault();

        // Validar que no haya campos vacios
        if(nombre.trim() === '' || correo.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
            M.toast({html: 'Todos los campos son obligatorios'});
            return;
        }


        // Password minimo 6 caracteres
        if(password.length < 6 ){
            M.toast({html: 'La contraseña debe tener al menos 6 caracteres'})
            return;
        }


        //Los 2 passwords son igguales
        if(password !== confirmar){
            M.toast({html: 'Las contraseñas deben coincidir'});
            return;
        }

        // Pasarlo al action
        registrarUsuario({
            nombre,
            correo,
            password
        });

    }



    return ( 

        <Fragment>
        <nav>
                <div className="nav-wrapper teal">
                <a href="#!" className="brand-logo">DietasApp</a>
                <ul className="right">
                    <li><Link to={'/login'} className="col s12 m10">Iniciar Sesion</Link></li>
                </ul>
                </div>
        </nav>

        <div className="container">
            <div className="row">
                <form className="col s12 m8 offset-m2" onSubmit={onSubmit}>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">person</i>
                            <input name='nombre' id="nombre" type="text" className="validate" onChange={onChange}/>
                            <label htmlFor="nombre" >Nombre</label>
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">email</i>
                            <input name='correo' id="correo" type="email" className="validate" onChange={onChange}/>
                            <label htmlFor="correo" >Correo</label>
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">password</i>
                            <input name='password' id="password" type="password" className="validate" onChange={onChange}/>
                            <label htmlFor="password" >Contraseña</label>
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">password</i>
                            <input name='confirmar' id="confirmar" type="password" className="validate" onChange={onChange}/>
                            <label htmlFor="confirmar" >Confirmar Contraseña</label>
                        </div>
                    </div>

                    <div className="row">
                        <button className="btn waves-effect waves-light col s12 m2 offset-m10" type="submit" name="action">Registrar
                            <i className="material-icons right">send</i>
                        </button>
                    </div>

                 </form>
            </div>
      </div>
      </Fragment>

     );
}
 
export default Singup;