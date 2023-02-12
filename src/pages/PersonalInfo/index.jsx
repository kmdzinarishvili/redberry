import React, { useState, useEffect } from 'react';

import PersonalForm from '../../components/form/personalform';
import Resume from '../../components/resume';

import '../../styles/Form.css';

const PersonalInfo = () => {
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
        <div className={`page horizontalGroup formPage`}>
            <PersonalForm values={values} setValues={setValues} />
            <Resume personalInfo={values} />
        </div>
    );
};
export default PersonalInfo;
