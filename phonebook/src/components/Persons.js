import React from "react";

const Person = ({ person, onDelete }) => (
  <div>
    {person.name} {person.number} <button onClick={() => onDelete(person)}>delete person</button>
  </div>
);

const Persons = ({ persons, onDelete }) =>
  persons.map(person => <Person key={person.id} person={person} onDelete={onDelete}/>);

export default Persons;