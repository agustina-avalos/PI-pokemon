import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from './componentes/Langing';
import Home from './componentes/Home';
import Detail from "./componentes/Detail"
import Create from './componentes/Create';




function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={ <LandingPage/> }    />
      <Route exact path='/home' element={<Home/>}  />
      <Route path='/detail/:id' element={<Detail/>}/>
      <Route path='/pokemon' element={<Create/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
