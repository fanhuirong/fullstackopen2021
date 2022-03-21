import React from 'react'

interface NameModel {
  name: string;
}
const Header = (props: NameModel) => {
  return (
    <h1>{props.name}</h1>
  )
}

export default Header