import React,{useState}  from 'react';

import styles from "./PersonalInfo.module.css";



const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      <h1>Upload and Display Image usign React Hook's</h1>
      {selectedImage && (
        <div>
        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
        <br />
        <button onClick={()=>setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />
     
      <br /> 
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
    </div>
  );
};


const InputGroup = ({values, id, labelText, placeholderText, desc}) =>{
    return (<div className={styles.inpGroup}>
        <label className={styles.label} htmlFor={id}>
          {labelText}
        </label>
        <input
          className={styles.input}
          id={id}
          placeholder={placeholderText}
          type="text"
          value={values[id]}/>
        <p className={styles.desc}>{desc}</p>
        </div>)
}
const PersonalForm = () =>{
    const [values, setValues] = useState({});
    const handleSubmit = () =>{
        console.log("SUBMITTED");
    }
    return (
      <form onSubmit={handleSubmit} className={styles.formInner}>
        <div className={styles.nameGroup}>
          <InputGroup 
          values={values}
          id ={"firstName"}
          labelText="სახელი"
          placeholderText="ანზორ"
          desc="მინიმუმ 2 ასო, ქართული ასოები"
          />
        <InputGroup 
          values={values}
          id ={"firstName"}
          labelText="გვარი"
          placeholderText="მუმლაძე"
          desc="მინიმუმ 2 ასო, ქართული ასოები"
          />
        </div>
        <label className={styles.label}>
          პირადი ფოტოს ატვირთვა
        </label>
        <input
        type="file"
        name="myImage"
        onChange={(event) => {
          // console.log(event.target.files[0]);
          // setSelectedImage(event.target.files[0]);
        }}
      />
     <label className={styles.label}>
      ჩემ შესახებ (არასავალდებულო)
      </label>
      <input
        type="textarea"
        placeholder='ზოგადი ინფო შენ შესახებ'
        />
        <InputGroup 
          values={values}
          id ={"email"}
          labelText="ელ.ფოსტა"
          placeholderText="anzorr666@redberry.ge"
          desc="უნდა მთავრდებოდეს @redberry.ge-ით"
          />
          <InputGroup 
          values={values}
          id ={"email"}
          labelText="მობილურის ნომერი"
          placeholderText="+995 551 12 34 56"
          desc="უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს"
          />
        <button type="submit">
          ატვირთვა
        </button>
        <button type="submit">
          ᲨᲔᲛᲓᲔᲒᲘ
        </button>
      
      </form>
    );
  };


const PersonalInfo = () =>{
    const [name, setName] = useState("");

    return (
        <div className='page'>
            <div className={styles.grey}>
                <PersonalForm/>
            </div>
            <div className='resume'></div>
        </div>
 
    );
}
export default PersonalInfo;

{/* <form>
<input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Full name"
  aria-label="fullname"
/>
<input type="submit" value="Submit"></input>
</form> */}
