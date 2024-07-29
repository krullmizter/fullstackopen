import {Header, Content, Total} from './components'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header title={course.name} />
      <Content data={course.parts[0]} />
      <Content data={course.parts[1]} />
      <Content data={course.parts[2]} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App