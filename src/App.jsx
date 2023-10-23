import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import './App.css';
import Form from './Form';
import TangleRed from './TangleRed';
import Servidor from './Servidor';
import Guia from './Guia';
function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="servidor" element={<Servidor/>}/>
        <Route path="/" element={<TangleRed/>}/>
        <Route path="guia" element={<Guia/>}/>
        
      </Routes>
    </BrowserRouter>
       
    </>
  )
}

export default App
