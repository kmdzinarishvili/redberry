import React from 'react';

import styles from './Header.module.css';
import back from '../../../imgs/form/back.png';

const Header = ({ text, buttonFunct }) => {
    return (
        <div className={styles.head}>
            <button
                type="button"
                className={styles.backBtn}
                onClick={buttonFunct}
            >
                <img src={back} alt="back arrow" />
            </button>
            <h2>{text}</h2>
            <div className={styles.underline} />
        </div>
    );
};
export default Header;
