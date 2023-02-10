import React from 'react';

const Resume = ({ values }) => {
    return (
        <div>
            <h1>RESUME</h1>
            <p>{JSON.stringify(values)}</p>
        </div>
    );
};

export default Resume;
