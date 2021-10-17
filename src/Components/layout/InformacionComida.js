import React,{useContext, useEffect, useState} from 'react';

import ComidaContext from '../../Context/comida/DietaContext';

import {PaginaContext} from '../../Context/PaginaContext';

const InformacionComida = () => {

    const comidaContext = useContext(ComidaContext);
    const {restantes,comida,total} = comidaContext;

    const {pagina} = useContext(PaginaContext);

    const[comidaInfo,guardarComidaInfo] = useState({
      prote: 0,
      grasa:0,
      carbos:0
    });

    useEffect(()=>{

      
      if(pagina === 0){
        return;
      }else{

        let prote = 0;
        let carbos = 0;
        let grasa = 0;

        comida.forEach(alimento =>{
              prote+= alimento.porcion * alimento.proteina;
              carbos+= alimento.porcion * alimento.carbohidrato;
              grasa+= alimento.porcion * alimento.grasa;
        })

        guardarComidaInfo({
          ...comidaInfo,
          prote,
          grasa,
          carbos
        })

      }

    },[comida, pagina])

    return ( 

        <div className="container">
        <table className="">
        <thead>
          <tr>
              <th>Proteina</th>
              <th>Carbohidratos</th>
              <th>Grasas</th>
              <th>Kcal</th>
              <th>Kcal Restantes</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{(comidaInfo.prote).toFixed(2) || 0} gr</td>
            <td>{(comidaInfo.carbos).toFixed(2) || 0} gr</td>
            <td>{(comidaInfo.grasa).toFixed(2) || 0} gr</td>
            <td>{ (((comidaInfo.prote + comidaInfo.carbos) * 4) + (comidaInfo.grasa * 9)).toFixed(2)  || 0}</td>
            <td>{restantes.toFixed(2)}</td>
          </tr>
          <tr>

            <td>{(((comidaInfo.prote * 4)/(((comidaInfo.prote + comidaInfo.carbos) * 4) + (comidaInfo.grasa * 9)))*100).toFixed(2) || 0}%</td>
            <td>{(((comidaInfo.carbos * 4)/(((comidaInfo.prote + comidaInfo.carbos) * 4) + (comidaInfo.grasa * 9)))*100).toFixed(2) || 0}%</td>
            <td>{(((comidaInfo.grasa * 9)/(((comidaInfo.prote + comidaInfo.carbos) * 4) + (comidaInfo.grasa * 9)))*100).toFixed(2) || 0}%</td> 
            <td>100%</td>         
            <td>{((restantes/total)*100).toFixed(2)}%</td>         
          </tr>
        </tbody>
      </table>
      </div>

     );
}
 
export default InformacionComida;