import React,{createContext,useState} from 'react';

export const PaginaContext = createContext();

const PaginaProvider = (props) => {

    const [pagina,guardarPagina] = useState(0)

    return (<PaginaContext.Provider
            value={{    
                pagina,
                guardarPagina
            }}
        >
            {props.children}
        </PaginaContext.Provider>)

     ;
}
 
export default PaginaProvider;