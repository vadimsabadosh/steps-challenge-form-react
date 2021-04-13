import React from 'react'
import { Link, Route } from 'react-router-dom'
import Header from './components/Header';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Result from './components/Result';



function App() {
  return (
    <>  
      <Header />
        
          <Route exact path='/' component={Step1}/>
          <Route path='/step2' component={Step2}/>
          <Route path='/step3' component={Step3}/>
          <Route path='/result' component={Result}/>
        
    </>
  );
}

export default App;
