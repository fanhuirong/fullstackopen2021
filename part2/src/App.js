import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterPersons, setFilterPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    if (persons.filter(item => item.name === newName).length) {
      alert(`${newName} has already added`)
      return false
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setFilterPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
    setNewFilter('')
  }

  const changeName = (e) => {
    setNewName(e.target.value)
  }
  const changeNumber = (e) => {
    setNewNumber(e.target.value)
  }
  const changeFilter = (e) =>{
    setNewFilter(e.target.value)
    // const filterArr = persons.filter(item => item.name.indexOf(e.target.value) !== -1)
    const filterArr = persons.filter(item => item.name.includes(e.target.value))
    setFilterPersons(filterArr) 
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with: <input value={newFilter} onChange={changeFilter} />
        </div>  
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={changeName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={changeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <>
        {filterPersons.map(item=><p key={item.name}>{item.name} {item.number}</p>)}
      </>
    </div>
  )
}

export default App