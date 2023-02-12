import React, { useState, useEffect } from 'react';

import Header from '../header';
import { useNavigate } from 'react-router-dom';
import SingleExperience from '../singleexperience';

const ExperienceForm = ({ values, setValues }) => {
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);

    const [experiences, setExperiences] = useState(() => {
        return values || [];
    });
    function isEmpty(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && obj[key] !== '') {
                return false;
            }
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        let eachSectionValid = true;
        let numSections = 0;
        for (const bool of Object.values(allValid)) {
            eachSectionValid = eachSectionValid && bool;
        }
        for (const ex of experiences) {
            if (!isEmpty(ex)) {
                numSections += 1;
            }
        }

        if (numSections > 0 && eachSectionValid) {
            navigate('/education');
        }
    };
    const goBack = () => {
        navigate(-1);
    };

    const goToFirstPage = () => {
        localStorage.clear();
        navigate('/');
    };
    const [allValid, setAllValid] = useState({});

    useEffect(() => {
        setAllValid(true);
    }, []);

    const [numExperiences, setNumExperiences] = useState(() => {
        if (values.length > 0) {
            return values.length;
        }
        return 1;
    });
    const [experienceList, setExperienceList] = useState([]);

    useEffect(() => {
        let arr = [];
        for (let i = 0; i < numExperiences; i++) {
            arr.push(
                <SingleExperience
                    key={i}
                    num={i}
                    values={experiences}
                    setValues={setExperiences}
                    setAllValid={setAllValid}
                    submitted={i === 0 && submitted}
                />
            );
        }
        setExperienceList(arr);
    }, [numExperiences, experiences, submitted]);

    const addExperience = (e) => {
        e.preventDefault();
        setNumExperiences((prev) => (prev += 1));
    };
    useEffect(() => {
        let experiencesArr = [];
        for (let i = 0; i < numExperiences; i++) {
            if (experiences) {
                let currExperience = experiences[i];
                if (currExperience) {
                    if (
                        currExperience['position'] ||
                        currExperience['employer'] ||
                        currExperience['start_date'] ||
                        currExperience['due_date'] ||
                        currExperience['description']
                    ) {
                        let currObj = {
                            position: currExperience['position'] || '',
                            employer: currExperience['employer'] || '',
                            start_date: currExperience['start_date'] || '',
                            due_date: currExperience['due_date'] || '',
                            description: currExperience['description'],
                        };
                        experiencesArr.push(currObj);
                    }
                }
            }
        }
        setValues(experiencesArr);
    }, [experiences, numExperiences, setValues]);
    return (
        <div className="grey">
            <form onSubmit={handleSubmit} className="formInner" noValidate>
                <Header
                    text="ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ"
                    buttonFunct={goToFirstPage}
                    pageNumber={2}
                    numPages={3}
                />
                {experienceList.map((item, index) => item)}
                <button
                    className="addButton"
                    type="button"
                    onClick={addExperience}
                >
                    მეტი გამოცდილების დამატება
                </button>
                <div className="btns">
                    <button
                        className="purpleBtn backBtn"
                        type="button"
                        onClick={goBack}
                    >
                        ᲣᲙᲐᲜ
                    </button>
                    <button className="purpleBtn submitBtn" type="submit">
                        ᲨᲔᲛᲓᲔᲒᲘ
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ExperienceForm;
