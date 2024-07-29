import React from 'react';
import StatisticLine from './StatisticLine';

const Stats = ({ good, neutral, bad }) => {
    const total = good + neutral + bad;
    const avgFeedback = total > 0 ? (good - bad) / total : 0;
    const posFeedback = total > 0 ? (good / total) * 100 : 0;
    
    return (
        <div>
            <h2>Statistics</h2>
            
            {good || neutral || bad > 0 ? (
            <table>
                <tbody>
                    <StatisticLine text={"Good"} value={good}/>
                    <StatisticLine text={"Neutral"} value={neutral}/>
                    <StatisticLine text={"Bad"} value={bad}/>
                    <StatisticLine text={"Total"} value={total}/>
                    <StatisticLine text={"Average"} value={avgFeedback.toFixed(2)}/>
                    <StatisticLine text={"Positive"} value={`${posFeedback.toFixed(0)}%`}/>
                </tbody>
            </table>
            ) : (
                <p>No feedback has been given.</p>
            )}
        </div>
    );
};

export default Stats;