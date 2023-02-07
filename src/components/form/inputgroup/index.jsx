import React from 'react';


import '../../../Form.css';


const InputGroup = ({values, id, labelText, placeholderText, desc, size="small", width="100px"}) =>{
    return (<div className="inpGroup">
        <label className="label" htmlFor={id}>
          {labelText}
        </label>
        <input
          className="input"
          id={id}
          placeholder={placeholderText}
          type="text"
          value={values[id]}
          style={{width:size=="small"?"371px":"798px"}}
          />
        <p className="desc">{desc}</p>
        </div>)
}
export default InputGroup;