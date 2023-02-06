import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';

import Home from './pages/Home';
import Education from "./pages/Education";
import PersonalInfo from "./pages/PersonalInfo";
import Experience from "./pages/Experience";


function App() {
  return (
    <Router>
       <Routes>
        <Route  path="/" element={<Home/>}/>
        <Route path="/personal_info" element={<PersonalInfo />}/>
        <Route path="/experience" element={<Experience />}/>
        <Route path="/education" element={<Education />}/>
      </Routes>
  </Router>
  );
}

export default App;
