import React from 'react'
import CoursePart from '../types'
import Part from './Part'

interface contentModel {
  data: CoursePart[]
}

const Content = ({data}: contentModel) => {
  return (
    <div>
      {data.map((item:CoursePart )=>
        <Part key={item.name} part={item}/>
      )}
    </div>
  )
}

export default Content