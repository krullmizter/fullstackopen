import { useState } from 'react'
import Stats from './Stats';
import Button from './Button';

const App = () => {
  const [getGood, setGood] = useState(0)
  const [getNeutral, setNeutral] = useState(0)
  const [getBad, setBad] = useState(0)
  const [getSelected, setSelected] = useState(0)

  // State management
  const goodClicks = () => setGood(getGood + 1)
  const neutralClicks = () => setNeutral(getNeutral + 1)
  const badClicks = () => setBad(getBad + 1)
  const anecdoteClick = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  return (
    <div>
      <div>
        <h1>Unicafe</h1>
        <h2>Give feedback</h2>
      </div>

      <div>
        <Button clickAction={goodClicks} name={"Good"}/>
        <Button clickAction={neutralClicks} name={"Neutral"}/>
        <Button clickAction={badClicks} name={"Bad"}/>
      </div>

      <Stats good={getGood} neutral={getNeutral} bad={getBad} />

      <div>
        <h2>Some wise words!</h2>
        <Button clickAction={anecdoteClick} name="Give me a word!"/>
        <p>{anecdotes[getSelected]}</p>
      </div>
    </div>
  )
}

export default App