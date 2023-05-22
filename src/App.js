import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Uploadcsv from './Pages/Uploadcsv';
function App() {
  return (
    <>
      <React.Fragment>
  
       <Navbar/>
       <Routes>
           <Route exact path ="/" element={<Home/>} />
           <Route exact path ="/upload" element={<Uploadcsv />} />
       </Routes>

      </React.Fragment>
    </>
  );
}

export default App;
