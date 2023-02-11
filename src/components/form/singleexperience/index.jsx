import React, { useState, useEffect } from 'react';
import InputGroup from '../inputgroup';

const SingleExperience = ({ num, values, setValues, setAllValid }) => {
    const [curr, setCurr] = useState(() => {
        if (values && values[num]) {
            return values[num];
        }
        return {};
    });
    useEffect(() => {
        setValues((prev) => {
            let previous = [...prev];
            previous[num] = curr;
            return previous;
        });
    }, [curr]);
    const [positionValid, setPositionValid] = useState(false);
    const [companyValid, setCompanyValid] = useState(false);
    const [startDateValid, setStartDateValid] = useState(false);
    const [endDateValid, setEndDateValid] = useState(false);
    const [descriptionValid, setDescriptionValid] = useState(false);
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
        if (isEmpty(curr)) {
            setEmpty(true);
        } else {
            setEmpty(false);
        }
    }, [curr]);

    useEffect(() => {
        if (curr && curr['position'] && curr['position'].length >= 2) {
            setPositionValid(true);
        } else {
            setPositionValid(false);
        }
    }, [curr['position']]);

    useEffect(() => {
        if (curr && curr['company'] && curr['company'].length >= 2) {
            setCompanyValid(true);
        } else {
            setCompanyValid(false);
        }
    }, [curr['company']]);

    useEffect(() => {
        if (curr['startDate']) {
            setStartDateValid(true);
        } else {
            setStartDateValid(false);
        }
    }, [curr['startDate']]);

    useEffect(() => {
        if (curr['endDate']) {
            setEndDateValid(true);
        } else {
            setEndDateValid(false);
        }
    }, [curr['endDate']]);
    useEffect(() => {
        if (curr && curr['description'] && curr['description'].length >= 2) {
            setDescriptionValid(true);
        } else {
            setDescriptionValid(false);
        }
    }, [curr['description']]);

    useEffect(() => {
        setAllValid((prev) => {
            return {
                ...prev,
                [num]:
                    (positionValid &&
                        companyValid &&
                        startDateValid &&
                        endDateValid &&
                        descriptionValid) ||
                    empty,
            };
        });
    }, [
        positionValid,
        companyValid,
        startDateValid,
        endDateValid,
        descriptionValid,
        empty,
    ]);

    const handleDescriptionChange = (event) => {
        setCurr((prev) => {
            return { ...prev, description: event.target.value };
        });
    };
    return (
        <>
            <InputGroup
                setValues={setCurr}
                values={curr}
                id={'position'}
                labelText="თანამდებობა"
                placeholderText="თანამდებობა"
                desc="მინიმუმ 2 სიმბოლო"
                size="large"
                doValidation={!empty}
                isValid={positionValid}
            />
            <InputGroup
                setValues={setCurr}
                values={curr}
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
                    setValues={setCurr}
                    values={curr}
                    id={'startDate'}
                    labelText="დაწყების რიცხვი"
                    placeholderText="დაწყების რიცხვი"
                    size="small"
                    doValidation={!empty}
                    isValid={startDateValid}
                    type="date"
                    doCheck={false}
                />
                <InputGroup
                    setValues={setCurr}
                    values={curr}
                    id={'endDate'}
                    labelText="დამთავრების რიცხვი"
                    placeholderText="დამთავრების რიცხვი"
                    size="small"
                    doValidation={!empty}
                    isValid={endDateValid}
                    type="date"
                    doCheck={false}
                />
            </div>
            <div className="inpGroup">
                <label className="label">ჩემ შესახებ (არასავალდებულო)</label>
                <textarea
                    className={`textArea ${
                        empty
                            ? ''
                            : descriptionValid
                            ? 'greenBorder'
                            : 'redBorder'
                    }`}
                    rows="5"
                    placeholder="ზოგადი ინფო შენ შესახებ"
                    value={curr['description'] || ''}
                    onChange={handleDescriptionChange}
                />
            </div>
        </>
    );
};
export default SingleExperience;
