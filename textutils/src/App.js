import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Textarea from './components/Textarea';
import About from './components/About';
import { useState } from 'react';

function App() {

  const [mode, setmode] = useState('light');

  const darkmode=()=>{
    if(mode==='light'){
      setmode('dark');
      document.body.style.backgroundcolor='black';
    }
    else{
      setmode('light');
      document.body.style.backgroundcolor='white';
    }
  }
  return (
     <>
 
  <Navbar  mode={mode} togglemode={darkmode}/>
  <div className="container my-3 ">

    

   <Textarea>

   </Textarea>

  </div>
  </>
  );
}

export default App;
