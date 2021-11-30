import React from 'react'

const PersonForm = ({
    addPerson,
    newName,
    changeName,
    newNumber,
    changeNumber
  }) => {
  return (
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
  )
}

export default PersonForm
