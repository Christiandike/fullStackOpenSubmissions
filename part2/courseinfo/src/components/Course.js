import React from "react";

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
  </div>
);

const Header = ({ course }) => <h2>{course.name}</h2>;

const Sum = ({ sum }) => <h4> Total of {sum} exercises</h4>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ course }) => {
  const parts = course.parts;
  const sum = parts.reduce((s, p) => {
    return s + p.exercises;
  }, 0);

  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <Sum sum={sum} />
    </div>
  );
};

export default Course;
