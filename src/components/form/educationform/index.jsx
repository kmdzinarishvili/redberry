import React, { useState, useEffect } from 'react';

import Header from '../header';
import { useNavigate } from 'react-router-dom';
import SingleEducation from '../singleeducation';
import axios from 'axios';

const EducationForm = ({ values, setValues, submit }) => {
    const navigate = useNavigate();

    const [educations, setEducations] = useState(() => {
        return values || [];
    });

    const [degrees, setDegrees] = useState([]);

    useEffect(() => {
        axios
            .get('https://resume.redberryinternship.ge/api/degrees')
            .then((res) => {
                setDegrees(res.data);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        let eachSectionValid = true;
        let numSections = 0;
        for (const bool of Object.values(allValid)) {
            eachSectionValid = eachSectionValid && bool;
        }
        for (const ed of educations) {
            if (!isEmpty(ed)) {
                numSections += 1;
            }
        }

        if (numSections > 0 && eachSectionValid) {
            submit();
        }
    };
    const goBack = () => {
        navigate(-1);
    };
    const goToFirstPage = () => {
        localStorage.clear();
        navigate('/');
    };
    const [allValid, setAllValid] = useState({});

    useEffect(() => {
        setAllValid(true);
    }, []);

    const [numEducations, setNumEducations] = useState(() => {
        if (values.length > 0) {
            return values.length;
        }
        return 1;
    });
    const [educationList, setEducationList] = useState([]);

    useEffect(() => {
        let arr = [];
        for (let i = 0; i < numEducations; i++) {
            arr.push(
                <SingleEducation
                    key={i}
                    num={i}
                    values={educations}
                    setValues={setEducations}
                    setAllValid={setAllValid}
                    degrees={degrees}
                />
            );
        }
        setEducationList(arr);
    }, [numEducations, educations, degrees]);

    const addEducation = (e) => {
        e.preventDefault();
        setNumEducations((prev) => (prev += 1));
    };
    useEffect(() => {
        let educationsArr = [];
        for (let i = 0; i < numEducations; i++) {
            if (educations) {
                let currEducation = educations[i];
                if (currEducation) {
                    if (
                        currEducation['institute'] ||
                        currEducation['degree'] ||
                        currEducation['due_date'] ||
                        currEducation['description']
                    ) {
                        let currObj = {
                            institute: currEducation['institute'] || '',
                            degree_id: currEducation['degree_id'] || '',
                            due_date: currEducation['due_date'] || '',
                            description: currEducation['description'] || '',
                        };
                        educationsArr.push(currObj);
                    }
                }
            }
        }
        setValues(educationsArr);
    }, [educations, numEducations, setValues]);
    return (
        <div className="grey">
            <form onSubmit={handleSubmit} className="formInner" noValidate>
                <Header
                    text="ᲒᲐᲜᲐᲗᲚᲔᲑᲐ"
                    buttonFunct={goToFirstPage}
                    pageNumber={3}
                    numPages={3}
                />
                {educationList.map((item, index) => item)}
                <button
                    className="addButton"
                    type="button"
                    onClick={addEducation}
                >
                    სხვა სასწავლებლის დამატება
                </button>
                <div className="btns">
                    <button
                        className="purpleBtn backBtn"
                        type="button"
                        onClick={goBack}
                    >
                        ᲣᲙᲐᲜ
                    </button>
                    <button className="purpleBtn submitBtn" type="submit">
                        ᲨᲔᲛᲓᲔᲒᲘ
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EducationForm;
