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

    const [institutionValid, setInstitutionValid] = useState(false);
    const [diplomaValid, setDiplomaValid] = useState(false);
    const [endDateValid, setEndDateValid] = useState(false);
    const [descriptionValid, setDescriptionValid] = useState(false);
    const [empty, setEmpty] = useState(true);
    const [diplomas, setDiplomas] = useState([]);

    useEffect(() => {
        fetch('https://resume.redberryinternship.ge/api/degrees')
            .then((res) => res.json())
            .then((result) => {
                setDiplomas(result);
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
        if (curr && curr['institution'] && curr['institution'].length >= 2) {
            setInstitutionValid(true);
        } else {
            setInstitutionValid(false);
        }
    }, [curr['institution']]);

    useEffect(() => {
        if (curr && curr['diploma'] && curr['diploma'].length >= 2) {
            setDiplomaValid(true);
        } else {
            setDiplomaValid(false);
        }
    }, [curr['diploma']]);

    useEffect(() => {
        if (curr['endDate']) {
            setEndDateValid(true);
        } else {
            setEndDateValid(false);
        }
    }, [curr['endDate']]);
    useEffect(() => {
        if (curr && curr['description']) {
            setDescriptionValid(true);
        } else {
            setDescriptionValid(false);
        }
    }, [curr['description']]);

    useEffect(() => {
        setAllValid((prev) => {
            console.log('inst', institutionValid);
            console.log('diploma', diplomaValid);
            console.log('end', endDateValid);
            console.log('desc', descriptionValid);
            return {
                ...prev,
                [num]:
                    (institutionValid &&
                        diplomaValid &&
                        endDateValid &&
                        descriptionValid) ||
                    empty,
            };
        });
    }, [institutionValid, diplomaValid, endDateValid, descriptionValid, empty]);

    const handleDescriptionChange = (event) => {
        setCurr((prev) => {
            return { ...prev, description: event.target.value };
        });
    };
    const handleDiplomaChange = (event) => {
        setCurr((prev) => {
            return { ...prev, diploma: event.target.value };
        });
    };
    return (
        <>
            <InputGroup
                setValues={setCurr}
                values={curr}
                id={'institution'}
                labelText="სასწავლებელი"
                placeholderText="სასწავლებელი"
                desc="მინიმუმ 2 სიმბოლო"
                size="large"
                doValidation={!empty}
                isValid={institutionValid}
            />
            <div className="horizontalGroup">
                <div className="inpGroup">
                    <label className="label">ხარისხი </label>
                    <select
                        className={`input ${
                            empty
                                ? ''
                                : diplomaValid
                                ? 'greenBorder'
                                : 'redBorder'
                        }`}
                        rows="5"
                        placeholder="ზოგადი ინფო შენ შესახებ"
                        value={curr['diploma'] || ''}
                        onChange={handleDiplomaChange}
                    >
                        <option></option>
                        {diplomas.map((item) => (
                            <option key={item.id} value={item.title}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                </div>
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
