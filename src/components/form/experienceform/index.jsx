import React, { useState, useEffect } from 'react';

import Header from '../header';
import { useNavigate } from 'react-router-dom';
import SingleExperience from '../singleexperience';

const ExperienceForm = ({ values, setValues }) => {
    const navigate = useNavigate();

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
                />
            );
        }
        setExperienceList(arr);
    }, [numExperiences, experiences]);

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
                        currExperience['company'] ||
                        currExperience['startDate'] ||
                        currExperience['endDate']
                    ) {
                        let currObj = {
                            position: currExperience['position'] || '',
                            company: currExperience['company'] || '',
                            startDate: currExperience['startDate'] || '',
                            endDate: currExperience['endDate'] || '',
                        };
                        experiencesArr.push(currObj);
                    }
                }
            }
        }
        setValues(experiencesArr);
    }, [experiences]);
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
                {allValid ? JSON.stringify(allValid) : 'not valid'}
                <button className="submitBtn" type="submit">
                    ᲨᲔᲛᲓᲔᲒᲘ
                </button>
            </form>
        </div>
    );
};

export default ExperienceForm;
