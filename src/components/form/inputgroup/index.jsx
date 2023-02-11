import React from 'react';

import check from '../../../imgs/form/check.png';
import warning from '../../../imgs/form/warning.png';
import '../../../styles/Form.css';

const InputGroup = ({
    values,
    id,
    labelText,
    placeholderText,
    desc,
    size = 'small',
    setValues,
    doValidation,
    isValid,
    type = 'text',
}) => {
    const handleChange = (event) => {
        setValues((prev) => {
            return { ...prev, [id]: event.target.value };
        });
    };
    return (
        <div className="inpGroup">
            <label
                className={`label ${doValidation && !isValid && 'redText'}`}
                htmlFor={id}
            >
                {labelText}
            </label>
            <div className="inpCont">
                <input
                    className={`input ${
                        !doValidation
                            ? ''
                            : isValid
                            ? 'greenBorder'
                            : 'redBorder'
                    }`}
                    id={id}
                    placeholder={placeholderText}
                    type={type}
                    value={values[id] || ''}
                    onChange={handleChange}
                    style={{ width: size === 'small' ? '371px' : '798px' }}
                />
                {doValidation &&
                    (isValid ? (
                        <img className="check" src={check} alt="check" />
                    ) : (
                        <img className="warn" src={warning} alt="warning" />
                    ))}
            </div>

            {desc && <p className="desc">{desc}</p>}
        </div>
    );
};
export default InputGroup;
