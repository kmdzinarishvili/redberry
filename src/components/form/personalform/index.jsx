import React, { useState, useEffect } from 'react';

import InputGroup from '../inputgroup';
import ImageUploader from '../imageuploader';
import Header from '../header';
import { useNavigate } from 'react-router-dom';

const PersonalForm = ({ values, setValues }) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (allValid) {
            navigate('/experience');
        }
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

    const [imageValid, setImageValid] = useState(false);
    const [firstNameValid, setFirstNameValid] = useState(false);
    const [lastNameValid, setLastNameValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [phoneValid, setPhoneValid] = useState(false);
    const [allValid, setAllValid] = useState(false);

    const validate = (obj) => {
        const isGeorgianString = (s) => {
            const startLett = 4304;
            const endLett = 4336;
            let charCode;
            for (let i = s.length; i--; ) {
                charCode = s.charCodeAt(i);
                if (charCode < startLett || charCode > endLett) return false;
            }
            return true;
        };

        if (obj['image']) {
            setImageValid(true);
        } else {
            setImageValid(false);
        }
        if (
            obj['firstName'] &&
            obj['firstName'].length >= 2 &&
            isGeorgianString(obj['firstName'])
        ) {
            setFirstNameValid(true);
        } else {
            setFirstNameValid(false);
        }
        if (
            obj['lastName'] &&
            obj['lastName'].length >= 2 &&
            isGeorgianString(obj['lastName'])
        ) {
            setLastNameValid(true);
        } else {
            setLastNameValid(false);
        }
        if (obj['email'] && obj['email'].endsWith('@redberry.ge')) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
        if (
            obj['phone'] &&
            /^\+995\s\d{3}\s\d{2}\s\d{2}\s\d{2}$/.test(obj['phone'])
        ) {
            setPhoneValid(true);
        } else {
            setPhoneValid(false);
        }
    };

    useEffect(() => {
        validate(values);
    }, [values]);

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
        <div className="grey">
            <form onSubmit={handleSubmit} className="formInner" noValidate>
                <Header
                    text="?????????????????? ????????????"
                    buttonFunct={goBack}
                    pageNumber={1}
                    numPages={3}
                />
                <div className="horizontalGroup">
                    <InputGroup
                        values={values}
                        id={'firstName'}
                        labelText="??????????????????"
                        placeholderText="???????????????"
                        setValues={setValues}
                        desc="????????????????????? 2 ?????????, ????????????????????? ??????????????????"
                        name={true}
                        doValidation={!empty}
                        isValid={firstNameValid}
                    />
                    <InputGroup
                        values={values}
                        setValues={setValues}
                        id={'lastName'}
                        labelText="???????????????"
                        placeholderText="?????????????????????"
                        desc="????????????????????? 2 ?????????, ????????????????????? ??????????????????"
                        name={true}
                        doValidation={!empty}
                        isValid={lastNameValid}
                    />
                </div>
                <ImageUploader image={values['image']} setImage={setImage} />
                <div className="inpGroup">
                    <label className="label">
                        ????????? ????????????????????? (??????????????????????????????????????????)
                    </label>
                    <textarea
                        className={`textArea ${!empty && 'greenBorder'}`}
                        rows="5"
                        placeholder="?????????????????? ???????????? ????????? ?????????????????????"
                        value={values['aboutMe'] || ''}
                        onChange={handleAboutMeChange}
                    />
                </div>
                <InputGroup
                    setValues={setValues}
                    values={values}
                    id={'email'}
                    labelText="??????.???????????????"
                    placeholderText="anzorr666@redberry.ge"
                    desc="???????????? ???????????????????????????????????? @redberry.ge-??????"
                    size="large"
                    doValidation={!empty}
                    isValid={emailValid}
                />
                <InputGroup
                    setValues={setValues}
                    values={values}
                    id={'phone'}
                    labelText="??????????????????????????? ??????????????????"
                    placeholderText="+995 551 12 34 56"
                    desc="???????????? ?????????????????????????????????????????? ????????????????????? ??????????????????????????? ?????????????????? ?????????????????????"
                    size="large"
                    doValidation={!empty}
                    isValid={phoneValid}
                />
                <button className="purpleBtn personalNextBtn" type="submit">
                    ?????????????????????
                </button>
            </form>
        </div>
    );
};

export default PersonalForm;
