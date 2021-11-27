import React from 'react'

const Content = ({ parts}) => {
  const Part = ({ part }) => {
    return (<p>
      {part.name} {part.exercises}
    </p>)
  }

  return (
    <div>
      {parts.map((item, index)=>{
        return ( <Part key={index} part={item}/>)
      })}
    </div>
  )
}

export default Content