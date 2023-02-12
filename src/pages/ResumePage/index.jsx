import React, { useState } from 'react';
import Resume from '../../components/resume';
import buttonStyles from '../../components/form/header/Header.module.css';
import { useNavigate } from 'react-router-dom';

import back from '../../imgs/form/back.png';
import styles from './Resume.module.css';
import x from '../../imgs/resume/x.png';

const ResumePage = () => {
    const [showNotification, setShowNotification] = useState(true);
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

    const [education, setEducation] = useState(() => {
        const saved = localStorage.getItem('education');
        const parsedValues = JSON.parse(saved);
        return parsedValues || [];
    });

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
                educations={education}
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
