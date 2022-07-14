import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import { Form } from "./components/Form";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

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
