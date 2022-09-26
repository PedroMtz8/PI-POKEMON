import './App.css';
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage"
import Home from "./Components/Home/Home"
import Create from './Components/Create/Create';
import CardDetail from './Components/CardDetail/CardDetail';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/'  element={<LandingPage/>}/>
        <Route path='/home'  element={<Home/>}/>
        <Route path='/pokemons/create'  element={<Create/>}/>
        <Route path="/pokemon/:id" element={<CardDetail/>}/>
    </Routes>
    
    </div>
    
  );
}

export default App;
