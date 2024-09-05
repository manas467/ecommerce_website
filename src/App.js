

import React from 'react'
import Headers from './componets/headers/Headers'
import Pages from './componets/mainpages/Pages';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './GlobalState';





const App = () => {
  return (
    <DataProvider>
    <Router>
    
    <div className='App'>

   
   <Headers/>
   
    <Pages/>
    
    
    </div>
    </Router>
    </DataProvider>
  )
}
 export default App;