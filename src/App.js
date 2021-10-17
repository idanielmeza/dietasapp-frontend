import React from 'react'
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';

import AuthState from './Context/auth/authState';

import PaginaProvider from './Context/PaginaContext';
import DietaState from './Context/comida/ComidaState';


import Inicio from './Components/Inicio';
import Login from './Components/auth/Login';
import Singup from './Components/auth/Singup';

import RutaPrivada from './Components/routes/RutaPrivada';

function App() {

  return (

  <AuthState>
    <PaginaProvider>
      <DietaState>

          <Router>
            <Switch>
              
              <RutaPrivada exact path='/' component={Inicio}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/singup' component={Singup}/>

            </Switch>
          </Router>

      </DietaState>
    </PaginaProvider>
  </AuthState>

    
    
  );
}

export default App;
