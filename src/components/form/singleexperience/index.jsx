import React, { useState, useEffect } from 'react';
import InputGroup from '../inputgroup';

const SingleExperience = ({
    num,
    values,
    setValues,
    setAllValid,
    submitted,
}) => {
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
    const [employerValid, setEmployerValid] = useState(false);
    const [startDateValid, setStartDateValid] = useState(false);
    const [dueDateValid, setDueDateValid] = useState(false);
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
        if (curr && curr['employer'] && curr['employer'].length >= 2) {
            setEmployerValid(true);
        } else {
            setEmployerValid(false);
        }
    }, [curr['employer']]);

    useEffect(() => {
        if (curr['start_date']) {
            setStartDateValid(true);
        } else {
            setStartDateValid(false);
        }
    }, [curr['start_date']]);

    useEffect(() => {
        if (curr['due_date']) {
            setDueDateValid(true);
        } else {
            setDueDateValid(false);
        }
    }, [curr['due_date']]);
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
                        employerValid &&
                        startDateValid &&
                        dueDateValid &&
                        descriptionValid) ||
                    empty,
            };
        });
    }, [
        positionValid,
        employerValid,
        startDateValid,
        dueDateValid,
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
                doValidation={!empty || submitted}
                isValid={positionValid}
            />
            <InputGroup
                setValues={setCurr}
                values={curr}
                id={'employer'}
                labelText="დამსაქმებელი"
                placeholderText="დამსაქმებელი"
                desc="მინიმუმ 2 სიმბოლო"
                size="large"
                doValidation={!empty || submitted}
                isValid={employerValid}
            />
            <div className="horizontalGroup">
                <InputGroup
                    setValues={setCurr}
                    values={curr}
                    id={'start_date'}
                    labelText="დაწყების რიცხვი"
                    placeholderText="დაწყების რიცხვი"
                    size="small"
                    doValidation={!empty || submitted}
                    isValid={startDateValid}
                    type="date"
                    doCheck={false}
                />
                <InputGroup
                    setValues={setCurr}
                    values={curr}
                    id={'due_date'}
                    labelText="დამთავრების რიცხვი"
                    placeholderText="დამთავრების რიცხვი"
                    size="small"
                    doValidation={!empty || submitted}
                    isValid={dueDateValid}
                    type="date"
                    doCheck={false}
                />
            </div>
            <div className="inpGroup">
                <label className="label">აღწერა</label>
                <textarea
                    className={`textArea ${
                        empty && !submitted
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
            <div className="greyLine"></div>
        </>
    );
};
export default SingleExperience;
