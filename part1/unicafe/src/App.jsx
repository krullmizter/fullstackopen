import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Unicafe</h1>
      <h2>Give feedback</h2>

      <button>Good</button>
      <button>Neutral</button>
      <button>Bad</button>

      <h2>Statistics</h2>
      <ul>
        <li>Good: </li>
        <li>Neutral: </li>
        <li>Bad: </li>
        <li>Average: </li>
        <li>Positive: </li>
      </ul>
    </div>
  )
}

export default App