import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Books from './components/bookManagement/Books';
import Registeration from "./components/Authentication/Registeration";
import Login from "./components/Authentication/Login";
import { utils } from './utils';
import { Navigate } from 'react-router-dom';
import ToastContainer from "./views/ToastContainer";

function App() {


  const renderAuthenticatedRoutes = () => (
    <Routes>
      <Route path="/" element={<Books />} />
      <Route path="/books" element={<Books />} />
      <Route path="*" element={<Navigate to="/books" replace />} />

    </Routes>
  );

  const renderUnauthenticatedRoutes = () => (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registeration />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );


  return (
    <>
      <ToastContainer />
      <Router>
        {utils.getAuth_token() ? renderAuthenticatedRoutes() : renderUnauthenticatedRoutes()}
      </Router>
    </>
  );
}

export default App;
