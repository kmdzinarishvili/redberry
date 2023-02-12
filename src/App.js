import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './fonts/HelveticaNeue-01.ttf';
import './fonts/HelveticaNeue-CondensedBold-05.ttf';

import './App.css';

import Home from './pages/Home';
import Education from './pages/Education';
import PersonalInfo from './pages/PersonalInfo';
import Experience from './pages/Experience';
import Resume from './pages/ResumePage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/personal_info" element={<PersonalInfo />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/education" element={<Education />} />
                <Route path="/resume" element={<Resume />} />
            </Routes>
        </Router>
    );
}

export default App;
