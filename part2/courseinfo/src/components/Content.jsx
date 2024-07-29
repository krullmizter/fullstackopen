import React from 'react';

const Content = ({ input }) => {
  return (
    <div>
      <p>{input.name} {input.exercises}</p>
    </div>
  );
};

export default Content;
