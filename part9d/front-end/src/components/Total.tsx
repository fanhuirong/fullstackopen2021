import React from 'react'
import CoursePart from '../types'

interface contentModel {
  data: CoursePart[]
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