import React, { useState, useEffect } from 'react';

import PersonalForm from '../../components/form/personalform';
import Resume from '../../components/form/resume';

import '../../styles/Form.css';
import styles from './PersonalInfo.module.css';

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
        <div className={`page ${styles.container}`}>
            <div className="grey">
                <PersonalForm values={values} setValues={setValues} />
            </div>
            <Resume values={values} />
            <div className="resume"></div>
        </div>
    );
};
export default PersonalInfo;
