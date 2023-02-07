import React,{useState}  from 'react';

import PersonalForm from '../../components/form/personalform';
import Resume from "../../components/form/resume";

import '../../Form.css';
import styles from "./PersonalInfo.module.css";



const PersonalInfo = () =>{
    const [values, setValues] = useState({});

    return (
        <div className={`page ${styles.container}`}>
            <div className='grey'>
                <PersonalForm values={values} setValues={setValues}/>

            </div>
            <Resume values={values}/>
            <div className='resume'></div>
        </div>
 
    );
}
export default PersonalInfo;