import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import Resume from '../../components/resume';
import EducationForm from '../../components/form/educationform';

import '../../styles/Form.css';

const Education = () => {
    const navigate = useNavigate();

    const savedPersonalInfo = localStorage.getItem('personal-info');
    const parsedPersonalInfo = JSON.parse(savedPersonalInfo);
    const personalInfo = parsedPersonalInfo || {};

    const savedExperiences = localStorage.getItem('experiences');
    const parsedExperiences = JSON.parse(savedExperiences);
    const experiences = parsedExperiences || [];

    const [values, setValues] = useState(() => {
        const saved = localStorage.getItem('education');
        const parsedValues = JSON.parse(saved);
        return parsedValues || [];
    });

    useEffect(() => {
        const stringifiedValues = JSON.stringify(values);
        localStorage.setItem('education', stringifiedValues);
    }, [values]);

    const submit = async () => {
        const dataUrlToBlob = (dataUrl) => {
            const parts = dataUrl.split(';base64,');
            const contentType = parts[0].split(':')[1];
            const byteCharacters = atob(parts[1]);
            const byteArrays = [];
            for (let i = 0; i < byteCharacters.length; i++) {
                byteArrays.push(byteCharacters.charCodeAt(i));
            }
            const byteArray = new Uint8Array(byteArrays);
            return new Blob([byteArray], { type: contentType });
        };
        const blob = dataUrlToBlob(personalInfo['image']);
        const file = new File([blob], 'myFileName', { type: 'image/png' });

        axios
            .post(
                'https://resume.redberryinternship.ge/api/cvs',
                {
                    name: personalInfo['firstName'],
                    surname: personalInfo['lastName'],
                    email: personalInfo['email'],
                    phone_number: personalInfo['phone'].replace(/\s/g, ''),
                    experiences: experiences,
                    educations: values,
                    image: file,
                    about_me: personalInfo['aboutMe'],
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            .then(function (response) {
                if (response.status === 201) {
                    navigate('/resume', { state: response.data });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <div className={`page `}>
            <EducationForm
                values={values}
                setValues={setValues}
                submit={submit}
            />
            <Resume
                personalInfo={personalInfo}
                experiences={experiences}
                educations={values}
            />
        </div>
    );
};
export default Education;
