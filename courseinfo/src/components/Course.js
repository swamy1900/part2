import React from 'react';

const Course = ({ course }) => {
  const parts = course.parts;

  const getparts = () =>
    parts.map(part => (
      <p key={part.id}>
        {part.name} {part.exercises}
      </p>
    ));

  const gettotal = () => {
    const getSum = (total, part) => (total = total + part.exercises);
    const val = parts.reduce(getSum, 0);

    return val;
  };

  return (
    <>
      <h1>{course.name}</h1>
      <div>
        <div>{getparts()}</div>
        <div>
          <strong>total of {gettotal()}</strong>
        </div>
      </div>
    </>
  );
};

export default Course;