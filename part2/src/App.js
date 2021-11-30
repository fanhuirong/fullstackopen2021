import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    if (persons.filter(item => item.name === newName).length) {
      alert(`${newName} has already added`)
      return false
    }
    const newPerson = {
      name: newName,
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const changeName = (e) => {
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={changeName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <>
        {persons.map(item=><p key={item.name}>{item.name}</p>)}
      </>
    </div>
  )
}

export default App