import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './Pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
