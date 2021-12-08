import React from 'react'

const Persons = ({
    filterPersons,
    deletePerson
  }) => {
  return (
    <div>
      {
        filterPersons.map(item => < p key = {
            item.id
          } > {
            item.name
          } {
            item.number
          } <button onClick = {
            ()=>deletePerson(item.id)
          }
          >删除</button></p > )
      }

    </div>
  )
}

export default Persons
