import React from 'react'

interface itemModel {
  name: string;
  exerciseCount: number
}
interface contentModel {
  data: itemModel[]
}

const Content = ({data}: contentModel) => {
  return (
    <div>
      {data.map((item:itemModel )=>{
        return (<p key={item.name}>{item.name} {item.exerciseCount}</p>)
      })}

    </div>
  )
}

export default Content