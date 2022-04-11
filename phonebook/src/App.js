  
import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personService from './services/persons.js';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notification, setNotification] = useState(null);
  const [notificationColor, setNotificationColor] = useState('green');

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      console.log('promise fulfilled!');
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = event => {
    setNewName(event.target.value);
  };
  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const personsToShow =
    filter === ''
      ? persons
      : persons.filter(person =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  const addPersonHandler = event => {
    event.preventDefault();

    const existingPersonsWithName = persons.filter(
      person => person.name === newName
    );

    // person name does not exist
    if (existingPersonsWithName.length === 0) {
      const newPerson = { name: newName, number: newNumber };

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');

          showNotification(`added ${returnedPerson.name} to the list`, 'green');
        })
        .catch(error => {
          // this is the way to access the error message
          console.log(error.response.data);
          showNotification(`${error.response.data.error}`, 'red');
        });
    }

    // person name already exists
    else {
      if (
        window.confirm(
          `${newName} is already added to phonebook. replace old number with a new one?`
        )
      ) {
        const existingPerson = existingPersonsWithName[0];

        const changedPerson = {
          name: newName,
          number: newNumber
        };

        personService
          .update(existingPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNewName('');
            setNewNumber('');

            showNotification(
              `changed ${returnedPerson.name}'s phone number`,
              'green'
            );
          })
          .catch(error => {
            showNotification(
              `ERROR: ${
                existingPerson.name
              } has been deleted and will be removed`,
              'red'
            );
            setPersons(persons.filter(p => p.id !== existingPerson.id));

            setNewName('');
            setNewNumber('');
          });
      }
    }
  };

  const deletePerson = delperson => {
    if (window.confirm(`really delete ${delperson.name}?`)) {
      console.log(`DELETE ${delperson.id}`);
      personService.deleteMe(delperson.id).then(returnedResponse => {
        setPersons(persons.filter(person => person.id !== delperson.id));
      });
    }
  };

  const showNotification = (text, col) => {
    setNotificationColor(col);
    setNotification(text);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} col={notificationColor} />
      <Filter filter={filter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        onSubmit={addPersonHandler}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} onDelete={deletePerson} />
    </div>
  );
};

export default App;