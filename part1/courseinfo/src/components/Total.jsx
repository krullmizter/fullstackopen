import React from 'react'

const Total = ({ parts }) => {

    const partsTotal = parts.reduce((sum, part) => sum + part.exercises, 0);

    return (
        <total>
            <p>Number of exercises: {partsTotal}</p>
        </total>
    )
}

export default Total;