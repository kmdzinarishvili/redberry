import React,{useState}  from 'react';

import InputGroup from '../inputgroup';
import ImageUploader from '../imageuploader';


const PersonalForm = () =>{
    const [values, setValues] = useState({});
    const handleSubmit = () =>{
        console.log("SUBMITTED");
    }
    return (
      <form onSubmit={handleSubmit} className="formInner">
        <div className="nameGroup">
          <InputGroup 
          values={values}
          id ={"firstName"}
          labelText="სახელი"
          placeholderText="ანზორ"
          desc="მინიმუმ 2 ასო, ქართული ასოები"
          name={true}
          />
        <InputGroup 
          values={values}
          id ={"firstName"}
          labelText="გვარი"
          placeholderText="მუმლაძე"
          desc="მინიმუმ 2 ასო, ქართული ასოები"
          name={true}
          />
        </div>
          <ImageUploader/>
      <div className='inpGroup'>
     <label className="label">
      ჩემ შესახებ (არასავალდებულო)
      </label>
      <textarea
        className='aboutMe'
        rows="5" 
        placeholder='ზოგადი ინფო შენ შესახებ'
        />
        </div>
        <InputGroup 
          values={values}
          id ={"email"}
          labelText="ელ.ფოსტა"
          placeholderText="anzorr666@redberry.ge"
          desc="უნდა მთავრდებოდეს @redberry.ge-ით"
          size="large"
          />
          <InputGroup 
          values={values}
          id ={"email"}
          labelText="მობილურის ნომერი"
          placeholderText="+995 551 12 34 56"
          desc="უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს"
          size="large"
          />
        <button
         className='submitBtn'
         type="submit">
          ᲨᲔᲛᲓᲔᲒᲘ
        </button>
      
      </form>
    );
  };

export default PersonalForm;