import React, { useState, useEffect } from 'react';

import PersonalForm from '../../components/form/personalform';
import Resume from '../../components/form/resume';

import '../../Form.css';
import styles from './PersonalInfo.module.css';

const PersonalInfo = () => {
    const [values, setValues] = useState(() => {
        const saved = localStorage.getItem('personal-info');
        const parsedValues = JSON.parse(saved);
        return parsedValues || {};
    });
    // const [otherState, setOtherState] = useState({});
    // useEffect(() => {
    //     const textFromStorage = localStorage.getItem('personal-info');
    //     const parsedValues = JSON.parse(textFromStorage);
    //     if (parsedValues) {
    //         console.log('parsed values', parsedValues);
    //         console.log(parsedValues.firstName);
    //         console.log(parsedValues.lastName);
    //         setOtherState(parsedValues.firstName);
    //     }
    // }, []);
    useEffect(() => {
        // console.log('other state', otherState);
        console.log('setting values', values);
        const stringifiedValues = JSON.stringify(values);
        localStorage.setItem('personal-info', stringifiedValues);
    }, [values]);

    // useEffect(() => {
    //     const textfromStorage = localStorage.getItem('other');
    //     const parsedValues = JSON.parse(textfromStorage);
    //     if (parsedValues) {
    //         setOther(parsedValues);
    //     }
    // }, []);
    // useEffect(() => {
    //     console.log('other after change', other);
    // }, [other]);

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
