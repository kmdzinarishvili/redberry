import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import Resume from '../../components/resume';
import EducationForm from '../../components/form/educationform';

import '../../styles/Form.css';

const Education = () => {
    const navigate = useNavigate();

    const [personalInfo, setPersonalInfo] = useState(() => {
        const saved = localStorage.getItem('personal-info');
        const parsedValues = JSON.parse(saved);
        return parsedValues || {};
    });
    const [experiences, setExperiences] = useState(() => {
        const saved = localStorage.getItem('experiences');
        const parsedValues = JSON.parse(saved);
        return parsedValues || [];
    });

    const [values, setValues] = useState(() => {
        const saved = localStorage.getItem('education');
        const parsedValues = JSON.parse(saved);
        return parsedValues || [];
    });

    useEffect(() => {
        const stringifiedValues = JSON.stringify(values);
        console.log(stringifiedValues);
        localStorage.setItem('education', stringifiedValues);
    }, [values]);

    const submit = async () => {
        function dataUrlToBlob(dataUrl) {
            const parts = dataUrl.split(';base64,');
            const contentType = parts[0].split(':')[1];
            const byteCharacters = atob(parts[1]);
            const byteArrays = [];
            for (let i = 0; i < byteCharacters.length; i++) {
                byteArrays.push(byteCharacters.charCodeAt(i));
            }
            const byteArray = new Uint8Array(byteArrays);
            return new Blob([byteArray], { type: contentType });
        }
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
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        navigate('/resume');
    };
    return (
        <div className={`page `}>
            <EducationForm
                values={values}
                setValues={setValues}
                submit={submit}
            />
            <Resume values={personalInfo} />
            {experiences.map((item, index) => {
                return <p key={'experience' + index}>{JSON.stringify(item)}</p>;
            })}
        </div>
    );
};
export default Education;
