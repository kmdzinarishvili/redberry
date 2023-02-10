import React, { useState, useEffect } from 'react';

import InputGroup from '../inputgroup';
import ImageUploader from '../imageuploader';
import Header from '../header';
import { useNavigate } from 'react-router-dom';

const PersonalForm = ({ values, setValues }) => {
    const navigate = useNavigate();

    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (allValid) {
            navigate('/experience');
        }
        console.log('SUBMITTED');
    };
    const goBack = () => {
        navigate(-1);
    };
    const handleAboutMeChange = (event) => {
        setValues((prev) => {
            return { ...prev, aboutMe: event.target.value };
        });
    };
    const setImage = (image) => {
        setValues((prev) => {
            return { ...prev, image: image };
        });
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

    function isGeorgianString(s) {
        const startLett = 4304;
        const endLett = 4336;
        let charCode;
        for (let i = s.length; i--; ) {
            charCode = s.charCodeAt(i);
            if (charCode < startLett || charCode > endLett) return false;
        }
        return true;
    }

    const [imageValid, setImageValid] = useState(false);
    const [firstNameValid, setFirstNameValid] = useState(false);
    const [lastNameValid, setLastNameValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [phoneValid, setPhoneValid] = useState(false);
    const [allValid, setAllValid] = useState(false);

    useEffect(() => {
        if (values['image']) {
            setImageValid(true);
        } else {
            setImageValid(false);
        }
    }, [values['image']]);
    useEffect(() => {
        if (
            values['firstName'] &&
            values['firstName'].length >= 2 &&
            isGeorgianString(values['firstName'])
        ) {
            setFirstNameValid(true);
        } else {
            setFirstNameValid(false);
        }
    }, [values.firstName]);

    useEffect(() => {
        if (
            values['lastName'] &&
            values['lastName'].length >= 2 &&
            isGeorgianString(values['lastName'])
        ) {
            setLastNameValid(true);
        } else {
            setLastNameValid(false);
        }
    }, [values['lastName']]);

    useEffect(() => {
        if (values['email'] && values['email'].endsWith('@redberry.ge')) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
    }, [values['email']]);

    useEffect(() => {
        if (
            values['phone'] &&
            /^\+995\s\d{3}\s\d{2}\s\d{2}\s\d{2}$/.test(values['phone'])
        ) {
            setPhoneValid(true);
        } else {
            setPhoneValid(false);
        }
    }, [values['phone']]);

    useEffect(() => {
        setAllValid(
            imageValid &&
                firstNameValid &&
                lastNameValid &&
                emailValid &&
                phoneValid
        );
    }, [imageValid, firstNameValid, lastNameValid, emailValid, phoneValid]);

    return (
        <form onSubmit={handleSubmit} className="formInner" noValidate>
            <Header text="ᲞᲘᲠᲐᲓᲘ ᲘᲜᲤᲝ" buttonFunct={goBack} />
            <div className="nameGroup">
                <InputGroup
                    values={values}
                    id={'firstName'}
                    labelText="სახელი"
                    placeholderText="ანზორ"
                    setValues={setValues}
                    desc="მინიმუმ 2 ასო, ქართული ასოები"
                    name={true}
                    doValidation={!empty}
                    isValid={firstNameValid}
                />
                <InputGroup
                    values={values}
                    setValues={setValues}
                    id={'lastName'}
                    labelText="გვარი"
                    placeholderText="მუმლაძე"
                    desc="მინიმუმ 2 ასო, ქართული ასოები"
                    name={true}
                    doValidation={!empty}
                    isValid={lastNameValid}
                />
            </div>
            <ImageUploader setImage={setImage} />
            <div className="inpGroup">
                <label className="label">ჩემ შესახებ (არასავალდებულო)</label>
                <textarea
                    className={`aboutMe ${!empty && 'greenBorder'}`}
                    rows="5"
                    placeholder="ზოგადი ინფო შენ შესახებ"
                    value={values['aboutMe'] || ''}
                    onChange={handleAboutMeChange}
                />
            </div>
            <InputGroup
                setValues={setValues}
                values={values}
                id={'email'}
                labelText="ელ.ფოსტა"
                placeholderText="anzorr666@redberry.ge"
                desc="უნდა მთავრდებოდეს @redberry.ge-ით"
                size="large"
                doValidation={!empty}
                isValid={emailValid}
            />
            {/* add spaces later */}
            <InputGroup
                setValues={setValues}
                values={values}
                id={'phone'}
                labelText="მობილურის ნომერი"
                placeholderText="+995 551 12 34 56"
                desc="უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს"
                size="large"
                doValidation={!empty}
                isValid={phoneValid}
            />
            {allValid ? 'all valid' : 'not valid'}
            <button className="submitBtn" type="submit">
                ᲨᲔᲛᲓᲔᲒᲘ
            </button>
        </form>
    );
};

export default PersonalForm;
