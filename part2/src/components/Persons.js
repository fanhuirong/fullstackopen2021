import React from 'react'

const Persons = ({ filterPersons }) => {
  return (
    <div>
      {filterPersons.map(item=><p key={item.name}>{item.name} {item.number}</p>)}
    </div>
  )
}

export default Persons
