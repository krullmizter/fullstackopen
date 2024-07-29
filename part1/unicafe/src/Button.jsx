import React from 'react';

const Button = ({ clickAmount, name }) => {
    return (
        <button onClick={clickAmount}>
            {name}
        </button>
    )
};

export default Button