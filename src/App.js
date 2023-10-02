import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Pages/HomePage";
import Logins from './Pages/LoginPage'
import SignupPage from "./Pages/SignupPage";

function App() {
  return (
    <>
     
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/login' element={<Logins/>}/>
     <Route path='/signup' element={<SignupPage/>}/>
    </Routes>
     
   </>
  );
}

export default App;
