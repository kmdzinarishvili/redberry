import React from 'react';

import styles from './Header.module.css';
import back from '../../../imgs/form/back.png';

const Header = ({ text, buttonFunct, pageNumber = 1, numPages = 3 }) => {
    return (
        <div className={styles.head}>
            <button
                type="button"
                className={styles.backBtn}
                onClick={buttonFunct}
            >
                <img src={back} alt="back arrow" />
            </button>
            <div className={styles.innerContainer}>
                <h2>{text}</h2>
                <p
                    className={styles.pageNum}
                    style={{ justifySelf: 'flex-end' }}
                >
                    {pageNumber}/{numPages}
                </p>
            </div>
            <div className={styles.underline} />
        </div>
    );
};
export default Header;
