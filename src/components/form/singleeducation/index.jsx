import React, { useState, useEffect } from 'react';
import InputGroup from '../inputgroup';

const SingleEducation = ({ num, values, setValues, setAllValid }) => {
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

    const [instituteValid, setInstituteValid] = useState(false);
    const [degreeValid, setDegreeValid] = useState(false);
    const [dueDateValid, setDueDateValid] = useState(false);
    const [descriptionValid, setDescriptionValid] = useState(false);
    const [empty, setEmpty] = useState(true);
    const [degrees, setDegrees] = useState([]);

    useEffect(() => {
        fetch('https://resume.redberryinternship.ge/api/degrees')
            .then((res) => res.json())
            .then((result) => {
                setDegrees(result);
            });
    }, []);
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
        if (curr && curr['institute'] && curr['institute'].length >= 2) {
            setInstituteValid(true);
        } else {
            setInstituteValid(false);
        }
    }, [curr['institute']]);

    useEffect(() => {
        if (curr && curr['degree'] && curr['degree'].length >= 2) {
            setDegreeValid(true);
        } else {
            setDegreeValid(false);
        }
    }, [curr['degree']]);

    useEffect(() => {
        if (curr['due_date']) {
            setDueDateValid(true);
        } else {
            setDueDateValid(false);
        }
    }, [curr['due_date']]);
    useEffect(() => {
        if (curr && curr['description']) {
            setDescriptionValid(true);
        } else {
            setDescriptionValid(false);
        }
    }, [curr['description']]);

    useEffect(() => {
        setAllValid((prev) => {
            console.log('inst', instituteValid);
            console.log('degree', degreeValid);
            console.log('end', dueDateValid);
            console.log('desc', descriptionValid);
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
    }, [instituteValid, degreeValid, dueDateValid, descriptionValid, empty]);

    const handleDescriptionChange = (event) => {
        setCurr((prev) => {
            return { ...prev, description: event.target.value };
        });
    };
    const handleDegreeChange = (event) => {
        setCurr((prev) => {
            return { ...prev, degree: event.target.value };
        });
    };
    return (
        <>
            <InputGroup
                setValues={setCurr}
                values={curr}
                id={'institute'}
                labelText="სასწავლებელი"
                placeholderText="სასწავლებელი"
                desc="მინიმუმ 2 სიმბოლო"
                size="large"
                doValidation={!empty}
                isValid={instituteValid}
            />
            <div className="horizontalGroup">
                <div className="inpGroup">
                    <label className="label">ხარისხი </label>
                    <select
                        className={`input ${
                            empty
                                ? ''
                                : degreeValid
                                ? 'greenBorder'
                                : 'redBorder'
                        }`}
                        rows="5"
                        placeholder="ზოგადი ინფო შენ შესახებ"
                        value={curr['degree'] || ''}
                        onChange={handleDegreeChange}
                    >
                        <option></option>
                        {degrees.map((item) => (
                            <option key={item.id} value={item.title}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                </div>
                <InputGroup
                    setValues={setCurr}
                    values={curr}
                    id={'due_date'}
                    labelText="დამთავრების რიცხვი"
                    placeholderText="დამთავრების რიცხვი"
                    size="small"
                    doValidation={!empty}
                    isValid={dueDateValid}
                    type="date"
                    doCheck={false}
                />
            </div>
            <div className="inpGroup">
                <label className="label">აღწერა</label>
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
export default SingleEducation;
