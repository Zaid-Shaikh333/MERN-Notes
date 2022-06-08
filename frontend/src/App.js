import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import DashBoard from './pages/Dashboard';
import Header from './components/Header'

function App() {
  return (
    <>
      <Router>
      <Header/>
        <div className='container'>
          <Routes>
            <Route path='/login' element={ <Login />} />
            <Route path='/register' element={ <Register />} />
            <Route path='/' element={ <DashBoard />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
