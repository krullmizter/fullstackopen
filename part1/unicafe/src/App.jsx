import { useState } from 'react'
import Stats from './Stats';
import Button from './Button';

const App = () => {
  const [getGood, setGood] = useState(0)
  const [getNeutral, setNeutral] = useState(0)
  const [getBad, setBad] = useState(0)

  // State management
  const goodClicks = () => setGood(getGood + 1);
  const neutralClicks = () => setNeutral(getNeutral + 1);
  const badClicks = () => setBad(getBad + 1);

  return (
    <div>
      <div>
        <h1>Unicafe</h1>
        <h2>Give feedback</h2>
      </div>

      <div>
        <Button clickAmount={goodClicks} name={"Good"}/>
        <Button clickAmount={neutralClicks} name={"Neutral"}/>
        <Button clickAmount={badClicks} name={"Bad"}/>
      </div>

      <Stats good={getGood} neutral={getNeutral} bad={getBad} />
    </div>
  )
}

export default App