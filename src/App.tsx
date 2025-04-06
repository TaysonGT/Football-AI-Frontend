import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router'
import Upload from './Pages/Upload';
import Processed from './Pages/Processed';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<Upload/>}/>
        <Route path='/processed' element={<Processed/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
