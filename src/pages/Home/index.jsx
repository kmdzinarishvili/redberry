import React from 'react';
import { useNavigate } from 'react-router-dom';

import stamp from '../../imgs/home/home_stamp.png';

import '../../App.css';
import styles from './Home.module.css';
import Header from '../../components/header';

const Home = () => {
    const navigate = useNavigate();
    const goToNextPage = () => {
        navigate('/personal_info');
    };
    return (
        <div className={`${styles.home} page`}>
            <Header />
            <button
                type="button"
                onClick={goToNextPage}
                className={styles.button}
            >
                ᲠᲔᲖᲘᲣᲛᲔᲡ ᲓᲐᲛᲐᲢᲔᲑᲐ
            </button>
            <img src={stamp} alt="logo" className={styles.stamp} />
        </div>
    );
};
export default Home;
