import React from 'react';
import styles from './Header.module.css';

import logo from '../../imgs/home/logo.png';

const Header = () => {
    return (
        <div className={styles.container}>
            <img className={styles.logo} src={logo} alt="logo" />
            <div className={styles.underline} />
        </div>
    );
};
export default Header;
