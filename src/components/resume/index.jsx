import React, { useState, useEffect } from 'react';

import emailIcon from '../../imgs/resume/email.png';
import phoneIcon from '../../imgs/resume/phone.png';
import resumeIcon from '../../imgs/resume/res_icon.png';
import '../../styles/Resume.css';

const Resume = ({ personalInfo, experiences, educations, border = false }) => {
    const [degreeNames, setDegreeNames] = useState([]);
    const [degrees, setDegrees] = useState([]);

    useEffect(() => {
        fetch('https://resume.redberryinternship.ge/api/degrees')
            .then((res) => res.json())
            .then((res) => {
                setDegreeNames(res);
            });
    }, []);
    useEffect(() => {
        if (educations) {
            educations.map(() => {
                let tempDegrees = [];
                for (let i = 0; i < educations.length; i++) {
                    for (let j = 0; j < degreeNames.length; j++) {
                        if (
                            degreeNames[j]['id'] == educations[i]['degree_id']
                        ) {
                            tempDegrees.push(degreeNames[i]['title']);
                        }
                    }
                }
                setDegrees(tempDegrees);
            });
        }
    }, [educations, degreeNames]);
    return (
        <div className={`resumeContainer ${border && 'border'}`}>
            <h2 className="name">
                {personalInfo['firstName'] &&
                    personalInfo['firstName'].toUpperCase() + ' '}
                {personalInfo['lastName'] &&
                    personalInfo['lastName'].toUpperCase()}
            </h2>
            {personalInfo['image'] && (
                <img
                    className="profile"
                    src={personalInfo['image']}
                    alt="uploaded Image"
                />
            )}
            <div className="email">
                {personalInfo['email'] && (
                    <div className="vert">
                        <img className="icon" src={emailIcon} alt="emailIcon" />
                        <p className="personalText">{personalInfo['email']}</p>
                    </div>
                )}
            </div>
            <div className="phone">
                {personalInfo['phone'] && (
                    <div className="vert">
                        <img className="icon" src={phoneIcon} alt="phoneIcon" />
                        <p className="personalText">{personalInfo['phone']}</p>
                    </div>
                )}
            </div>
            {personalInfo['aboutMe'] && (
                <div>
                    <h3 className="sectionTitle">ᲩᲔᲛ ᲨᲔᲡᲐᲮᲔᲑ</h3>
                    <p className="aboutText me">{personalInfo['aboutMe']}</p>
                </div>
            )}
            {personalInfo && (experiences || educations) && (
                <div className="line"></div>
            )}
            {experiences && (
                <h3 className="sectionTitle" style={{ marginTop: '24px' }}>
                    ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ
                </h3>
            )}
            {experiences &&
                experiences.map((ex, index) => {
                    return (
                        <div key={'education' + index}>
                            <div className="horizontalGroup job">
                                {ex['position'] && (
                                    <h4 className="subTitle">
                                        {ex['position'] + ', '}
                                    </h4>
                                )}
                                {ex['employer'] && (
                                    <h4
                                        className="subTitle"
                                        style={{ marginLeft: '7px' }}
                                    >
                                        {ex['employer']}
                                    </h4>
                                )}
                            </div>
                            <div
                                className="horizontalGroup"
                                style={{ marginTop: '7px' }}
                            >
                                {ex['start_date'] && (
                                    <h4 className="date">
                                        {ex['start_date'].toString() + ' - '}
                                    </h4>
                                )}
                                {ex['due_date'] && (
                                    <h4
                                        className="date"
                                        style={{ marginLeft: '7px' }}
                                    >
                                        {ex['due_date']}
                                    </h4>
                                )}
                            </div>
                            {ex['description'] && (
                                <p className="aboutText">{ex['description']}</p>
                            )}
                        </div>
                    );
                })}
            {personalInfo && experiences && educations && (
                <div className="line"></div>
            )}
            {educations && (
                <h3 className="sectionTitle" style={{ marginTop: '24px' }}>
                    ᲒᲐᲜᲐᲗᲚᲔᲑᲐ
                </h3>
            )}
            {educations &&
                educations.map((ed, index) => {
                    return (
                        <div key={'education' + index}>
                            <div className="horizontalGroup job">
                                {ed['institute'] && (
                                    <h4 className="subTitle">
                                        {ed['institute'] + ', '}
                                    </h4>
                                )}
                                {ed['degree_id'] &&
                                    degrees &&
                                    degrees[index] && (
                                        <h4
                                            className="subTitle"
                                            style={{ marginLeft: '7px' }}
                                        >
                                            {degrees[index]}
                                        </h4>
                                    )}
                            </div>
                            <div
                                className="horizontalGroup"
                                style={{ marginTop: '7px' }}
                            >
                                {ed['start_date'] && (
                                    <h4 className="date">
                                        {ed['start_date'].toString()}
                                    </h4>
                                )}
                            </div>
                            {ed['description'] && (
                                <p className="aboutText">{ed['description']}</p>
                            )}
                        </div>
                    );
                })}

            <img className="resIcon" src={resumeIcon} alt="resume icon" />
        </div>
    );
};

export default Resume;
