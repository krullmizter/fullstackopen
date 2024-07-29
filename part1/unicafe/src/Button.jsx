import React from 'react';

const Button = ({ clickAction, name }) => {
    return (
        <button onClick={clickAction}>
            {name}
        </button>
    )
};

export default Button