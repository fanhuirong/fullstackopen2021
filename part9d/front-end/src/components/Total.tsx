import React from 'react'
interface itemModel {
  name: string;
  exerciseCount: number
}
interface contentModel {
  data: itemModel[]
}

const Total = ({data}: contentModel) => {
  return (
      <p>
        Number of exercises{" "}
        {data.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
  )
}

export default Total