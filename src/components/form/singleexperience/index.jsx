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
    }, [curr, num, setValues]);
    const [positionValid, setPositionValid] = useState(false);
    const [employerValid, setEmployerValid] = useState(false);
    const [startDateValid, setStartDateValid] = useState(false);
    const [dueDateValid, setDueDateValid] = useState(false);
    const [descriptionValid, setDescriptionValid] = useState(false);
    const [empty, setEmpty] = useState(true);
    const isEmpty = (obj) => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && obj[key] !== '') {
                return false;
            }
        }
        return true;
    };
    useEffect(() => {
        if (isEmpty(curr)) {
            setEmpty(true);
        } else {
            setEmpty(false);
        }
    }, [curr]);

    const validate = (obj) => {
        if (obj && obj['position'] && obj['position'].length >= 2) {
            setPositionValid(true);
        } else {
            setPositionValid(false);
        }
        if (obj && obj['employer'] && obj['employer'].length >= 2) {
            setEmployerValid(true);
        } else {
            setEmployerValid(false);
        }
        if (obj['start_date']) {
            setStartDateValid(true);
        } else {
            setStartDateValid(false);
        }
        if (obj['due_date']) {
            setDueDateValid(true);
        } else {
            setDueDateValid(false);
        }
        if (obj && obj['description'] && obj['description'].length >= 2) {
            setDescriptionValid(true);
        } else {
            setDescriptionValid(false);
        }
    };

    useEffect(() => {
        validate(curr);
    }, [curr]);

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
        num,
        setAllValid,
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
                labelText="?????????????????????????????????"
                placeholderText="?????????????????????????????????"
                desc="????????????????????? 2 ?????????????????????"
                size="large"
                doValidation={!empty || submitted}
                isValid={positionValid}
            />
            <InputGroup
                setValues={setCurr}
                values={curr}
                id={'employer'}
                labelText="????????????????????????????????????"
                placeholderText="????????????????????????????????????"
                desc="????????????????????? 2 ?????????????????????"
                size="large"
                doValidation={!empty || submitted}
                isValid={employerValid}
            />
            <div className="horizontalGroup">
                <InputGroup
                    setValues={setCurr}
                    values={curr}
                    id={'start_date'}
                    labelText="???????????????????????? ??????????????????"
                    placeholderText="???????????????????????? ??????????????????"
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
                    labelText="????????????????????????????????? ??????????????????"
                    placeholderText="????????????????????????????????? ??????????????????"
                    size="small"
                    doValidation={!empty || submitted}
                    isValid={dueDateValid}
                    type="date"
                    doCheck={false}
                />
            </div>
            <div className="inpGroup">
                <label className="label">??????????????????</label>
                <textarea
                    className={`textArea ${
                        empty && !submitted
                            ? ''
                            : descriptionValid
                            ? 'greenBorder'
                            : 'redBorder'
                    }`}
                    rows="5"
                    placeholder="?????????????????? ???????????? ????????? ?????????????????????"
                    value={curr['description'] || ''}
                    onChange={handleDescriptionChange}
                />
            </div>
            <div className="greyLine"></div>
        </>
    );
};
export default SingleExperience;
