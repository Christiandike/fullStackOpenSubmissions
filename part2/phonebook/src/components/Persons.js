import React from "react";

const Persons = ({ persons, query }) => {
  if (!query) {
    return (
      <div>
        {persons.map((person) => (
          <Display key={person.id} name={person.name} number={person.number} />
        ))}
      </div>
    );
  }

  return (
    <div>
      {persons.map((person) => {
        const nameInLowerCase = person.name.toLowerCase();
        const match = nameInLowerCase.includes(query);

        if (match) {
          return (
            <Display
              key={person.id}
              name={person.name}
              number={person.number}
            />
          );
        }
      })}
    </div>
  );
};

const Display = ({ name, number }) => (
  <p>
    {name} {number}
  </p>
);

export default Persons;
