import React from 'react';
import './ButtonAdd.css';


const ButtonAdd = ({ onClick, label, disabled }) => {
    return (
        <button onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
};

export default ButtonAdd;