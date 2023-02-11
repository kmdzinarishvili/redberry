import React, { useState, useEffect } from 'react';

import Resume from '../../components/resume';
import EducationForm from '../../components/form/educationform';

import '../../styles/Form.css';

const Education = () => {
    const [personalInfo, setPersonalInfo] = useState(() => {
        const saved = localStorage.getItem('personal-info');
        const parsedValues = JSON.parse(saved);
        return parsedValues || {};
    });
    const [experiences, setExperiences] = useState(() => {
        const saved = localStorage.getItem('experiences');
        const parsedValues = JSON.parse(saved);
        console.log(parsedValues);
        return parsedValues || [];
    });

    const [values, setValues] = useState(() => {
        const saved = localStorage.getItem('education');
        const parsedValues = JSON.parse(saved);
        return parsedValues || [];
    });

    useEffect(() => {
        const stringifiedValues = JSON.stringify(values);
        console.log(stringifiedValues);
        localStorage.setItem('education', stringifiedValues);
    }, [values]);

    return (
        <div className={`page `}>
            <EducationForm values={values} setValues={setValues} />
            <Resume values={personalInfo} />
            {experiences.map((item, index) => {
                return <p key={'experience' + index}>{JSON.stringify(item)}</p>;
            })}
        </div>
    );
};
export default Education;
