import React from 'react';

const AssessmentTwo = () => {
    const handleClick = () => {
        alert('Button clicked!');
    };

    return (
        <div>
            <h1>Assessment Two Component</h1>
            <button onClick={handleClick}>Click Me</button>
        </div>
    );
};

export default AssessmentTwo;