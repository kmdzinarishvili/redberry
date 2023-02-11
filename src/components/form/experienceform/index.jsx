import React, { useState, useEffect } from 'react';

import InputGroup from '../inputgroup';
import Header from '../header';
import { useNavigate } from 'react-router-dom';

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

    const [positionValid, setPositionValid] = useState(false);
    const [companyValid, setCompanyValid] = useState(false);
    const [startDateValid, setStartDateValid] = useState(false);
    const [endDateValid, setEndDateValid] = useState(false);

    const [allValid, setAllValid] = useState(false);

    useEffect(() => {
        if (values['position'] && values['position'].length >= 2) {
            setPositionValid(true);
        } else {
            setPositionValid(false);
        }
    }, [values['position']]);

    useEffect(() => {
        if (values['company'] && values['company'].length >= 2) {
            setCompanyValid(true);
        } else {
            setCompanyValid(false);
        }
    }, [values['company']]);

    useEffect(() => {
        if (values['startDate']) {
            setStartDateValid(true);
        } else {
            setStartDateValid(false);
        }
    }, [values['startDate']]);

    useEffect(() => {
        if (values['endDate']) {
            setEndDateValid(true);
        } else {
            setEndDateValid(false);
        }
    }, [values['endDate']]);

    useEffect(() => {
        setAllValid(
            positionValid && companyValid && startDateValid && endDateValid
        );
    }, [positionValid, companyValid, startDateValid, endDateValid]);

    return (
        <div className="grey">
            <form onSubmit={handleSubmit} className="formInner" noValidate>
                <Header text="ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ" buttonFunct={goBack} />
                <InputGroup
                    setValues={setValues}
                    values={values}
                    id={'position'}
                    labelText="თანამდებობა"
                    placeholderText="თანამდებობა"
                    desc="მინიმუმ 2 სიმბოლო"
                    size="large"
                    doValidation={!empty}
                    isValid={positionValid}
                />
                <InputGroup
                    setValues={setValues}
                    values={values}
                    id={'company'}
                    labelText="დამსაქმებელი"
                    placeholderText="დამსაქმებელი"
                    desc="მინიმუმ 2 სიმბოლო"
                    size="large"
                    doValidation={!empty}
                    isValid={companyValid}
                />
                <div className="horizontalGroup">
                    <InputGroup
                        setValues={setValues}
                        values={values}
                        id={'startDate'}
                        labelText="დაწყების რიცხვი"
                        placeholderText="დაწყების რიცხვი"
                        size="small"
                        doValidation={!empty}
                        isValid={startDateValid}
                        type="date"
                    />
                    <InputGroup
                        setValues={setValues}
                        values={values}
                        id={'endDate'}
                        labelText="დამთავრების რიცხვი"
                        placeholderText="დამთავრების რიცხვი"
                        size="small"
                        doValidation={!empty}
                        isValid={endDateValid}
                        type="date"
                    />
                </div>

                {allValid ? 'all valid' : 'not valid'}
                <button className="submitBtn" type="submit">
                    ᲨᲔᲛᲓᲔᲒᲘ
                </button>
            </form>
        </div>
    );
};

export default ExperienceForm;
