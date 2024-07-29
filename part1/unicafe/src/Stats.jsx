import React from 'react';

const Stats = ({ good, neutral, bad }) => {
    const total = good + neutral + bad;
    const avgFeedback = total > 0 ? (good - bad) / total : 0;
    const posFeedback = total > 0 ? (good / total) * 100 : 0;
    
    return (
        <div>
            <h2>Statistics</h2>
            <ul>
                <li>Good: {good}</li>
                <li>Neutral: {neutral}</li>
                <li>Bad: {bad}</li>
                <li>Total: {total}</li>
                <li>Average: {avgFeedback.toFixed(2)}</li>
                <li>Positive: {posFeedback.toFixed(0)}%</li>
            </ul>
        </div>
    );
};

export default Stats;