import React,{useContext} from 'react'
import { PaginaContext } from '../../Context/PaginaContext';

const Header = () => {

    const {guardarPagina} = useContext(PaginaContext);

    const cambiarPagina = (num)=>{
        guardarPagina(num)
    }
    
    return ( 

        <div className="row">
            <div className="col s12">
                <ul className="tabs tabs-fixed-width tab-demo z-depth-1 teal darken-1">
                    <li className="tab"><a className='grey-text text-lighten-5' href="#" onClick={()=> cambiarPagina(0)} >Perfil</a></li>
                    <li className="tab"><a className='grey-text text-lighten-5' href="#" onClick={()=> cambiarPagina(1)} >Comida 1</a></li>
                    <li className="tab"><a className='grey-text text-lighten-5' href="#" onClick={()=> cambiarPagina(2)} >Comida 2</a></li>
                    <li className="tab"><a className='grey-text text-lighten-5' href="#" onClick={()=> cambiarPagina(3)} >Comida 3</a></li>
                    <li className="tab"><a className='grey-text text-lighten-5' href="#" onClick={()=> cambiarPagina(4)} >Comida 4</a></li>
                    <li className="tab"><a className='grey-text text-lighten-5' href="#" onClick={()=> cambiarPagina(5)} >Comida 5</a></li>
                </ul>
            </div>
        </div>

        
     );
}
 
export default Header;