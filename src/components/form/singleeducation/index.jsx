import React, { useState, useEffect } from 'react';
import InputGroup from '../inputgroup';

const SingleEducation = ({ num, values, setValues, setAllValid, degrees }) => {
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

    const [degree, setDegree] = useState('');
    const [instituteValid, setInstituteValid] = useState(false);
    const [degreeValid, setDegreeValid] = useState(false);
    const [dueDateValid, setDueDateValid] = useState(false);
    const [descriptionValid, setDescriptionValid] = useState(false);
    const [empty, setEmpty] = useState(true);

    useEffect(() => {
        if (curr['degree_id']) {
            for (let i = 0; i < degrees.length; i++) {
                if (degrees[i]['id'] === parseInt(curr['degree_id'])) {
                    setDegree(degrees[i]['title']);
                }
            }
        }
    }, [degrees, curr]);
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

    const validate = (obj, deg) => {
        if (obj && obj['institute'] && obj['institute'].length >= 2) {
            setInstituteValid(true);
        } else {
            setInstituteValid(false);
        }
        if (deg) {
            setDegreeValid(true);
        } else {
            setDegreeValid(false);
        }
        if (obj['due_date']) {
            setDueDateValid(true);
        } else {
            setDueDateValid(false);
        }
        if (obj && obj['description']) {
            setDescriptionValid(true);
        } else {
            setDescriptionValid(false);
        }
    };
    useEffect(() => {
        validate(curr, degree);
    }, [curr, degree]);

    useEffect(() => {
        setAllValid((prev) => {
            return {
                ...prev,
                [num]:
                    (instituteValid &&
                        degreeValid &&
                        dueDateValid &&
                        descriptionValid) ||
                    empty,
            };
        });
    }, [
        instituteValid,
        degreeValid,
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
    const handleDegreeChange = (e) => {
        setDegree(e.target.value);
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index];
        const option = el.getAttribute('id');
        setCurr((prev) => {
            return { ...prev, degree_id: option };
        });
    };
    return (
        <>
            <InputGroup
                setValues={setCurr}
                values={curr}
                id={'institute'}
                labelText="????????????????????????????????????"
                placeholderText="????????????????????????????????????"
                desc="????????????????????? 2 ?????????????????????"
                size="large"
                doValidation={!empty}
                isValid={instituteValid}
            />
            <div className="horizontalGroup">
                <div className="inpGroup">
                    <label className="label">????????????????????? </label>
                    <select
                        className={`input ${
                            empty
                                ? ''
                                : degreeValid
                                ? 'greenBorder'
                                : 'redBorder'
                        }`}
                        rows="5"
                        placeholder="?????????????????? ???????????? ????????? ?????????????????????"
                        value={degree || ''}
                        onChange={handleDegreeChange}
                    >
                        <option></option>
                        {degrees.map((item) => (
                            <option
                                key={item.id}
                                id={item.id}
                                value={item.title}
                            >
                                {item.title}
                            </option>
                        ))}
                    </select>
                </div>
                <InputGroup
                    setValues={setCurr}
                    values={curr}
                    id={'due_date'}
                    labelText="????????????????????????????????? ??????????????????"
                    placeholderText="????????????????????????????????? ??????????????????"
                    size="small"
                    doValidation={!empty}
                    isValid={dueDateValid}
                    type="date"
                    doCheck={false}
                />
            </div>
            <div className="inpGroup">
                <label className="label">??????????????????</label>
                <textarea
                    className={`textArea ${
                        empty
                            ? ''
                            : descriptionValid
                            ? 'greenBorder'
                            : 'redBorder'
                    }`}
                    rows="5"
                    placeholder="?????????????????? ???????????? ????????? ?????????????????????"
                    value={curr['description'] || ''}
                    onChange={handleDescriptionChange}
                    style={{ height: '179px' }}
                />
            </div>
            <div className="greyLine"></div>
        </>
    );
};
export default SingleEducation;
