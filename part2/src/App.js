import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import request from './request'

const App = () => {
  const [persons, setPersons] = useState([])
  // const [filterPersons, setFilterPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    getAll()
  }, [])

  const getAll = () =>{
    request.getAll().then(personList => {
      console.log(personList)
      setPersons(personList)
    })
  }
  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (persons.filter(item => item.name === newName).length) {
      // alert(`${newName} has already added`)
      const id = persons.find(item=>item.name === newName).id
      request.update(id, newPerson).then(data => {
        getAll()
      })
    }else{
      request.create(newPerson).then(data => {
        setPersons(persons.concat(data))
      })
    }

  }

  const changeName = (e) => {
    setNewName(e.target.value)
  }
  
  const changeNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const deletePerson = (id) =>{
    console.log(id)
    request.deleteItem(id).then(data=>{
      getAll()
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
        {/* <div>
          <Filter newFilter={newFilter} changeFilter={changeFilter}/>
        </div>   */}
        <h3>Add a new</h3>
        <PersonForm newName={newName} changeName={changeName} newNumber={newNumber}  changeNumber={changeNumber} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons filterPersons={persons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App