import React from 'react'
import Card from './Card';
import Demo from './Demo';

const App = () => {
 
  return (
    <>
    <Demo />
    <Card customClasses="bg-yellow-100"/>
    <Card customClasses="bg-green-100"/>
    <Card customClasses="bg-blue-100"/>
    </>
  )
}

export default App