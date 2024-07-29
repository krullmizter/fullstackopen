import { useState } from 'react'
import Stats from './Stats';

const App = () => {
  const [getGood, setGood] = useState(0)
  const [getNeutral, setNeutral] = useState(0)
  const [getBad, setBad] = useState(0)

  // State management
  const goodClicks = () => setGood(getGood + 1);
  const neutralClick = () => setNeutral(getNeutral + 1);
  const badClicks = () => setBad(getBad + 1);

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

      <Stats good={getGood} neutral={getNeutral} bad={getBad} />
    </div>
  )
}

export default App