import React from 'react'

const Content = ({ part1, part2, part3 }) => {
  const Part = ({ part }) => {
    return (<p>
      {part.name} {part.exercises}
    </p>)
  }

  return (
    <div>
      <Part part={part1}  />
      <Part part={part2}/>
      <Part part={part3} />
    </div>
  )
}

export default Content