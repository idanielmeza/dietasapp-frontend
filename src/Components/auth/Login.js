import React,{Fragment, useEffect,useState,useContext} from 'react';
import {Link} from 'react-router-dom';
import M from 'materialize-css';
import AuthContext from '../../Context/auth/authContext';

const Login = (props) => {

    //Extraer valores del context
    const authContext = useContext(AuthContext);
    const {iniciarSesion,autenticado} = authContext;

    useEffect(()=>{

        if(autenticado){
            props.history.push('/');
        }

        // eslint-disable-next-line
    },[autenticado, props.history])


    const [usuario,guardarUsuario] = useState({
        correo: '',
        password: '',
    });

    const {correo,password} = usuario;

    const onChange = (e)=>{

        guardarUsuario({...usuario,
            [e.target.name]: e.target.value
        })

    }

    const onSubmit = e =>{
        e.preventDefault();

        // Validar que no haya campos vacios
        if(correo.trim() === '' || password.trim() === '' ){
            M.toast({html: 'Todos los campos son obligatorios'})
            return;
        }

        //pasarlo al action
        iniciarSesion(usuario);

    }

    return ( 
        <Fragment>
        <nav>
                <div className="nav-wrapper teal">
                <a href="#!" className="brand-logo">DietasApp</a>
                <ul className="right">
                    <li><Link to={'/singup'} className="col s12 m10">Crear Cuenta</Link></li>
                </ul>
                </div>
        </nav>

        <div className="container">
            <div className="row">
                <form className="col s12 m8 offset-m2" onSubmit={onSubmit}>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">email</i>
                            <input name='correo' id="icon_prefix" type="email" className="validate" onChange={onChange}/>
                            <label htmlFor="icon_prefix">Correo</label>
                            </div>
                            <div className="input-field col s12">
                            <i className="material-icons prefix">password</i>
                            <input name='password' id="icon_telephone" type="password" className="validate" onChange={onChange}/>
                            <label htmlFor="icon_telephone">Contraseña</label>
                        </div>
                    </div>

                    <div className="row">
                        <button className="btn waves-effect waves-light col s12 m2 offset-m10" type="submit" name="action">Conectar
                            <i className="material-icons right">send</i>
                        </button>
                    </div>

                    

                 </form>
            </div>
      </div>
      </Fragment>

     );
}
 
export default Login;