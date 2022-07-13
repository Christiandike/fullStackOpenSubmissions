import { useState } from "react";
import Filter from "./components/Filter";
import { Form } from "./components/Form";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-552211", id: 2 },
    { name: "Dan Abramov", number: "12-43-234435", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-642332", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [query, setQuery] = useState("");

  const addName = (e) => {
    e.preventDefault();

    const nameExists = persons.some((person) => person.name === newName);
    const numExists = persons.some((person) => person.number === newNum);

    if (nameExists && numExists) {
      alert("Contact already exists");
    } else if (nameExists) {
      alert(`${newName} is already added to phonebook`);
    } else if (numExists) {
      alert(`${newNum} is already added to phonebook`);
    } else {
      const nameObj = {
        name: newName,
        number: newNum,
        id: newName,
      };

      setPersons(persons.concat(nameObj));
      setNewName("");
      setNewNum("");

      alert("Contact added successfully");
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumChange = (e) => {
    setNewNum(e.target.value);
  };

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={query} onChange={handleQuery} />

      <h3>Add a new</h3>

      <Form
        value1={newName}
        value2={newNum}
        onChange1={handleNameChange}
        onChange2={handleNumChange}
        onSubmit={addName}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} query={query} />
    </div>
  );
};

export default App;
