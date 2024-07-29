import React from 'react';
import { Header, Content, Total } from './';

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      {course.parts.map(part => (
        <Content key={part.id} data={part} />
      ))}
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;