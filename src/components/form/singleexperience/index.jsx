import React, { useState, useEffect } from 'react';
import InputGroup from '../inputgroup';

const SingleExperience = ({ num, values, setValues, setAllValid }) => {
    const [positionValid, setPositionValid] = useState(false);
    const [companyValid, setCompanyValid] = useState(false);
    const [startDateValid, setStartDateValid] = useState(false);
    const [endDateValid, setEndDateValid] = useState(false);
    const [empty, setEmpty] = useState(true);
    function isEmpty(obj) {
        for (const key in obj) {
            if (
                key === 'position' + num ||
                key === 'company' + num ||
                key === 'startDate' + num ||
                key === 'endState' + num
            ) {
                if (obj.hasOwnProperty(key) && obj[key] !== '') {
                    return false;
                }
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

    useEffect(() => {
        if (values['position' + num] && values['position' + num].length >= 2) {
            setPositionValid(true);
        } else {
            setPositionValid(false);
        }
    }, [values['position' + num]]);

    useEffect(() => {
        if (values['company' + num] && values['company' + num].length >= 2) {
            setCompanyValid(true);
        } else {
            setCompanyValid(false);
        }
    }, [values['company' + num]]);

    useEffect(() => {
        if (values['startDate' + num]) {
            setStartDateValid(true);
        } else {
            setStartDateValid(false);
        }
    }, [values['startDate' + num]]);

    useEffect(() => {
        if (values['endDate' + num]) {
            setEndDateValid(true);
        } else {
            setEndDateValid(false);
        }
    }, [values['endDate' + num]]);

    useEffect(() => {
        setAllValid((prev) => {
            return {
                ...prev,
                num:
                    positionValid &&
                    companyValid &&
                    startDateValid &&
                    endDateValid,
            };
        });
    }, [positionValid, companyValid, startDateValid, endDateValid]);

    return (
        <>
            <InputGroup
                setValues={setValues}
                values={values}
                id={'position' + num}
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
                id={'company' + num}
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
                    id={'startDate' + num}
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
                    id={'endDate' + num}
                    labelText="დამთავრების რიცხვი"
                    placeholderText="დამთავრების რიცხვი"
                    size="small"
                    doValidation={!empty}
                    isValid={endDateValid}
                    type="date"
                />
            </div>
        </>
    );
};
export default SingleExperience;
