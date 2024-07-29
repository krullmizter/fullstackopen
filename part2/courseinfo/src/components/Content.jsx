import React from 'react';

const Content = ({ data }) => {
  return (
    <p>{data.name} {data.exercises}</p>
  );
};

export default Content;
