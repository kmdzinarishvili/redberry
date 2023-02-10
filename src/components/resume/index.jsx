import React from 'react';

import emailIcon from '../../imgs/resume/email.png';
import phoneIcon from '../../imgs/resume/phone.png';
import '../../styles/Resume.css';

const Resume = ({ values }) => {
    return (
        <div className="resumeContainer">
            <h2 className="name">
                {values['firstName'] && values['firstName'].toUpperCase() + ' '}
                {values['lastName'] && values['lastName'].toUpperCase()}
            </h2>
            {values['image'] && (
                <img
                    className="profile"
                    src={values['image']}
                    alt="uploaded Image"
                />
            )}
            <div className="email">
                {values['email'] && (
                    <div className="vert">
                        <img className="icon" src={emailIcon} alt="emailIcon" />
                        <p className="personalText">{values['email']}</p>
                    </div>
                )}
            </div>
            <div className="phone">
                {values['phone'] && (
                    <div className="vert">
                        <img className="icon" src={phoneIcon} alt="phoneIcon" />
                        <p className="personalText">{values['phone']}</p>
                    </div>
                )}
            </div>
            {values['aboutMe'] && (
                <div>
                    <h5 className="aboutMeTitle">ᲩᲔᲛ ᲨᲔᲡᲐᲮᲔᲑ</h5>
                    <p className="aboutMeText">{values['aboutMe']}</p>
                </div>
            )}
        </div>
    );
};

export default Resume;
