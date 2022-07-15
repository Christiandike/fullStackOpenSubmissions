import React from "react";
import { Button } from "./Form";

const Persons = ({ persons, query, onClick }) => {
  const match = persons.filter((person) => {
    const nameInLowerCase = person.name.toLowerCase();
    return nameInLowerCase.includes(query);
  });

  if (!query) {
    return (
      <div>
        {persons.map((person) => (
          <Display
            key={person.id}
            name={person.name}
            number={person.number}
            onClick={() => onClick(person.id, person.name)}
            text="delete"
          />
        ))}
      </div>
    );
  }

  if (match.length > 0) {
    return (
      <div>
        {match.map((person) => (
          <Display
            key={person.id}
            name={person.name}
            number={person.number}
            onClick={() => onClick(person.id, person.name)}
            text="delete"
          />
        ))}
      </div>
    );
  }

  if (match.length === 0) {
    return <p>Contact not found!</p>;
  }
};

const Display = ({ name, number, onClick, text }) => (
  <p>
    {name} {number} <Button onClick={() => onClick()} text={text} />
  </p>
);

export default Persons;
