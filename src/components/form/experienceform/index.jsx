import React, { useState, useEffect } from 'react';

import InputGroup from '../inputgroup';
import Header from '../header';
import { useNavigate } from 'react-router-dom';
import SingleExperience from '../singleexperience';

const ExperienceForm = ({ values, setValues }) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (allValid) {
            navigate('/education');
        }
    };
    const goBack = () => {
        navigate(-1);
    };

    const [empty, setEmpty] = useState(true);
    function isEmpty(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && obj[key] !== '') {
                return false;
            }
        }
        return true;
    }
    useEffect(() => {
        if (isEmpty(values)) {
            setEmpty(true);
        } else {
            setEmpty(false);
        }
    }, [values]);

    const [allValid, setAllValid] = useState(false);

    useEffect(() => {
        setAllValid(true);
    }, []);

    const [numExperiences, setNumExperiences] = useState(1);
    const [experienceList, setExperienceList] = useState([]);

    useEffect(() => {
        let arr = [];
        for (let i = 0; i < numExperiences; i++) {
            arr.push(
                <SingleExperience
                    key={i}
                    num={i}
                    values={values}
                    setValues={setValues}
                    setAllValid={setAllValid}
                />
            );
        }
        console.log(arr);
        setExperienceList(arr);
    }, [numExperiences, values, empty]);
    const addExperience = (e) => {
        e.preventDefault();
        setNumExperiences((prev) => (prev += 1));
    };
    return (
        <div className="grey">
            <form onSubmit={handleSubmit} className="formInner" noValidate>
                <Header text="ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ" buttonFunct={goBack} />
                {experienceList.map((item, index) => item)}
                <button
                    type="button"
                    style={{ width: 100, height: 100 }}
                    onClick={addExperience}
                />
                {allValid ? 'all valid' : 'not valid'}
                <button className="submitBtn" type="submit">
                    ᲨᲔᲛᲓᲔᲒᲘ
                </button>
            </form>
        </div>
    );
};

export default ExperienceForm;
