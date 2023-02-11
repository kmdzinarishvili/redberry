import React, { useState, useEffect } from 'react';

import ExperienceForm from '../../components/form/experienceform';
import Resume from '../../components/resume';

import '../../styles/Form.css';

const Experience = () => {
    const [personalInfo, setPersonalInfo] = useState(() => {
        const saved = localStorage.getItem('personal-info');
        const parsedValues = JSON.parse(saved);
        return parsedValues || {};
    });

    const [values, setValues] = useState(() => {
        const saved = localStorage.getItem('experiences');
        const parsedValues = JSON.parse(saved);
        return parsedValues || [];
    });

    useEffect(() => {
        const stringifiedValues = JSON.stringify(values);
        console.log(stringifiedValues);
        localStorage.setItem('experiences', stringifiedValues);
    }, [values]);

    return (
        <div className={`page `}>
            <ExperienceForm values={values} setValues={setValues} />
            <Resume values={personalInfo} />
            <div className="resume"></div>
        </div>
    );
};
export default Experience;
