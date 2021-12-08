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
    // console.log('effect')
    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => {
    //     // console.log('promise fulfilled')
    //     setPersons(response.data)
    //     // setFilterPersons(response.data)
    //   })
    getAll()
  }, [])
  // console.log('render', persons.length, 'notes')

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


      // axios
      //   .post('http://localhost:3001/persons', newPerson)
      //   .then(response => {
      //     setPersons(persons.concat(response.data))
      //     // setFilterPersons(persons.concat(response.data))
      //     setNewName('')
      //     setNewNumber('')
      //     setNewFilter('')
      //   })
  }

  const changeName = (e) => {
    setNewName(e.target.value)
  }
  const changeNumber = (e) => {
    setNewNumber(e.target.value)
  }
  // const changeFilter = (e) =>{
  //   setNewFilter(e.target.value)
  //   // const filterArr = persons.filter(item => item.name.indexOf(e.target.value) !== -1)
  //   const filterArr = persons.filter(item => item.name.includes(e.target.value))
  //   setFilterPersons(filterArr) 
  // }

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