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

    const [degree, setDegree] = useState('');
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
                if (curr['degree_id']) {
                    for (let i = 0; i < result.length; i++) {
                        if (result[i]['id'] == curr['degree_id']) {
                            setDegree(result[i]['title']);
                        }
                    }
                }
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
    }, [curr]);

    useEffect(() => {
        if (degree) {
            setDegreeValid(true);
        } else {
            setDegreeValid(false);
        }
    }, [degree]);

    useEffect(() => {
        if (curr['due_date']) {
            setDueDateValid(true);
        } else {
            setDueDateValid(false);
        }
    }, [curr]);
    useEffect(() => {
        if (curr && curr['description']) {
            setDescriptionValid(true);
        } else {
            setDescriptionValid(false);
        }
    }, [curr]);

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
    }, [instituteValid, degreeValid, dueDateValid, descriptionValid, empty]);

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
                    style={{ height: '179px' }}
                />
            </div>
            <div className="greyLine"></div>
        </>
    );
};
export default SingleEducation;
