import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // State management
  const goodClicks = () => setGood(good + 1);
  const neutralClick = () => setNeutral(neutral + 1);
  const badClicks = () => setBad(bad + 1);

  return (
    <div>
      <h1>Unicafe</h1>
      <h2>Give feedback</h2>

      <button onClick={goodClicks}>Good</button>
      <button onClick={neutralClick}>Neutral</button>
      <button onClick={badClicks}>Bad</button>


      <h2>Statistics</h2>
      <ul>
        <li>Good: {good}</li>
        <li>Neutral: {neutral}</li>
        <li>Bad: {bad}</li>
        <li>Average: </li>
        <li>Positive: </li>
      </ul>
    </div>
  )
}

export default App