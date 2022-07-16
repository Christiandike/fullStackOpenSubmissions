import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import { Form } from "./components/Form";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [query, setQuery] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data))
      .catch(() => {
        setErrMsg(
          "Failed to load contacts. Make sure your internet is connected"
        );
        setTimeout(() => {
          setErrMsg("");
        }, 5000);
      });
  }, []);

  const addName = (e) => {
    e.preventDefault();

    const nameExists = persons.some((person) => person.name === newName);
    const numExists = persons.some((person) => person.number === newNum);

    if (!newName || !newNum) {
      setErrMsg("Add a name and number!");
      setTimeout(() => {
        setErrMsg("");
      }, 5000);
    } else if (nameExists && numExists) {
      setErrMsg("Contact already exists");
      setTimeout(() => {
        setErrMsg("");
      }, 5000);
    } else if (nameExists) {
      const confirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with the new one?`
      );

      const contact = persons.find((person) => person.name === newName);
      const updatedContact = { ...contact, number: newNum };

      if (confirm) {
        axios
          .put(`http://localhost:3001/persons/${contact.id}`, updatedContact)
          .then((response) => {
            setSuccessMsg(`Updated ${newName}`);
            setTimeout(() => {
              setSuccessMsg("");
            }, 5000);
            setPersons(
              persons.map((person) =>
                person.id !== contact.id ? person : response.data
              )
            );
          })
          .catch(() => {
            setErrMsg(`Failed to update ${newName}`);
            setTimeout(() => {
              setErrMsg("");
            }, 5000);
          });
      }
    } else {
      const nameObj = {
        name: newName,
        number: newNum,
      };

      axios
        .post("http://localhost:3001/persons", nameObj)
        .then((response) => {
          setSuccessMsg(`Added ${newName}`);
          setTimeout(() => {
            setSuccessMsg("");
          }, 5000);
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNum("");
        })
        .catch(() => {
          setErrMsg(`Failed to add ${newName}`);
          setTimeout(() => {
            setErrMsg("");
          }, 5000);
        });
    }
  };

  const deleteContact = (id, name) => {
    const confirm = window.confirm(`Delete ${name}?`);

    if (confirm) {
      axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(() => {
          setSuccessMsg(`Deleted ${name}`);
          setTimeout(() => {
            setSuccessMsg("");
          }, 5000);
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch(() => {
          setErrMsg(`${name} has already been deleted`);
          setTimeout(() => {
            setErrMsg("");
          });
        });
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

      <Notification message={errMsg} type="error" />
      <Notification message={successMsg} type="success" />

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

      <Persons persons={persons} query={query} onClick={deleteContact} />
    </div>
  );
};

export default App;
