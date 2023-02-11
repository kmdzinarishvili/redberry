import React, { useState, useEffect } from 'react';

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
        console.log(parsedValues);
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

    const submit = () => {
        // fetch('https://mywebsite.example/endpoint/', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         name: personalInfo['firstName'],
        //         surname: personalInfo['lastName'],
        //         email: personalInfo['email'],
        //         phone_number: personalInfo['phone'],
        //         experiences: [
        //             {
        //                 position: 'back-end developer',
        //                 employer: 'Redberry',
        //                 start_date: '2019/09/09',
        //                 due_date: '2020/09/23',
        //                 description:
        //                     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare nunc dui, a pellentesque magna blandit dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis diam nisi, at venenatis dolor aliquet vel. Pellentesque aliquet leo nec tortor pharetra, ac consectetur orci bibendum.',
        //             },
        //         ],
        //         educations: [
        //             {
        //                 institute: 'თსუ',
        //                 degree: 'სტუდენტი',
        //                 due_date: '2017/06/25',
        //                 description:
        //                     'სამართლის ფაკულტეტის მიზანი იყო მიგვეღო ფართო თეორიული ცოდნა სამართლის არსის, სისტემის, ძირითადი პრინციპების, სამართლებრივი სისტემების, ქართული სამართლის ისტორიული წყაროების, კერძო, სისხლის და საჯარო სამართლის სფეროების ძირითადი თეორიების, პრინციპებისა და რეგულირების თავისებურებების შესახებ.',
        //             },
        //         ],
        //         image: personalInfo[""],
        //         about_me: personalInfo["aboutMe"],
        //     }),
        // });
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
