import React from 'react';

const MyButton = ({onClick,label,disabled}) => {
    return (
       <button onClick={onClick} disabled={disabled}>
       {label}
        </button>
    );
};

export default MyButton;
