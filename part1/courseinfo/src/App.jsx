import {Header, Content, Total} from './components'

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
  {
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }
  ]

  return (
    <div>
      <Header course={course} />
      <Content courseInfo={parts[0]} />
      <Content courseInfo={parts[1]} />
      <Content courseInfo={parts[2]} />
      <Total parts={parts} />
    </div>
  )
}

export default App