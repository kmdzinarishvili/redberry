import React, { useState, useEffect } from 'react';

import ExperienceForm from '../../components/form/experienceform';
import Resume from '../../components/resume';

import '../../styles/Form.css';

const Experience = () => {
    const [values, setValues] = useState(() => {
        const saved = localStorage.getItem('personal-info');
        const parsedValues = JSON.parse(saved);
        return parsedValues || {};
    });

    useEffect(() => {
        const stringifiedValues = JSON.stringify(values);
        localStorage.setItem('personal-info', stringifiedValues);
    }, [values]);

    return (
        <div className={`page `}>
            <ExperienceForm values={values} setValues={setValues} />
            <Resume values={values} />
            <div className="resume"></div>
        </div>
    );
};
export default Experience;
