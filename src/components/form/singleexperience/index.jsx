import React, { useState, useEffect } from 'react';
import InputGroup from '../inputgroup';

const SingleExperience = ({ doValidation, values, setValues, setAllValid }) => {
    const [positionValid, setPositionValid] = useState(false);
    const [companyValid, setCompanyValid] = useState(false);
    const [startDateValid, setStartDateValid] = useState(false);
    const [endDateValid, setEndDateValid] = useState(false);

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
        <>
            <InputGroup
                setValues={setValues}
                values={values}
                id={'position'}
                labelText="თანამდებობა"
                placeholderText="თანამდებობა"
                desc="მინიმუმ 2 სიმბოლო"
                size="large"
                doValidation={doValidation}
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
                doValidation={doValidation}
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
                    doValidation={doValidation}
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
                    doValidation={doValidation}
                    isValid={endDateValid}
                    type="date"
                />
            </div>
        </>
    );
};
export default SingleExperience;
