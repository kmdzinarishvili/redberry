import React, { useState } from 'react';
import Resume from '../../components/resume';
import buttonStyles from '../../components/form/header/Header.module.css';
import { useNavigate } from 'react-router-dom';

import back from '../../imgs/form/back.png';
import styles from './Resume.module.css';
import x from '../../imgs/resume/x.png';

const ResumePage = () => {
    const [showNotification, setShowNotification] = useState(true);
    const savedPersonalInfo = localStorage.getItem('personal-info');
    const parsedPersonalInfo = JSON.parse(savedPersonalInfo);
    const personalInfo = parsedPersonalInfo || {};

    const savedExperiences = localStorage.getItem('experiences');
    const parsedExperiences = JSON.parse(savedExperiences);
    const experiences = parsedExperiences || [];

    const savedEducations = localStorage.getItem('education');
    const parsedEducations = JSON.parse(savedEducations);
    const educations = parsedEducations || [];

    const navigate = useNavigate();

    const goToFirstPage = () => {
        localStorage.clear();
        navigate('/');
    };
    const closeNotification = () => {
        setShowNotification(false);
    };
    return (
        <div
            className="page"
            style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '54px',
                paddingBottom: '129px',
                position: 'absolute',
            }}
        >
            <button
                type="button"
                className={buttonStyles.backBtn}
                onClick={goToFirstPage}
                style={{ backgroundColor: '#F9F9F9' }}
            >
                <img src={back} alt="back arrow" />
            </button>

            <Resume
                personalInfo={personalInfo}
                experiences={experiences}
                educations={educations}
                border={true}
            />
            {showNotification && (
                <div className={styles.successContainer}>
                    <p className={styles.success}>
                        რეზიუმე წარმატებით გაიგზავნა 🎉
                    </p>
                    <button className={styles.x} onClick={closeNotification}>
                        <img src={x} alt="close notification" />
                    </button>
                </div>
            )}
        </div>
    );
};
export default ResumePage;
