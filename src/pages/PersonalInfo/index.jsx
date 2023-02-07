import React,{useState}  from 'react';

import PersonalForm from '../../components/form/personalform';

import '../../Form.css';



const PersonalInfo = () =>{
    const [name, setName] = useState("");

    return (
        <div className='page'>
            <div className='grey'>
                <PersonalForm/>
            </div>
            <div className='resume'></div>
        </div>
 
    );
}
export default PersonalInfo;