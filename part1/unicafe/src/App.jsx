import { useState } from 'react'
import Stats from './Stats';

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
      <div>
        <h1>Unicafe</h1>
        <h2>Give feedback</h2>
      </div>

      <div>
        <button onClick={goodClicks}>Good</button>
        <button onClick={neutralClick}>Neutral</button>
        <button onClick={badClicks}>Bad</button>
      </div>

      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App