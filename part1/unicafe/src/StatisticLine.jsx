import React from 'react';

const StatisticLine = ({ text, value }) => {
    return (
        <li>
            {text}: {value}
        </li>
    )
};

export default StatisticLine