import React from 'react'
 interface Props {
    message:string;
 }
const LivingRoom = ({message}:Props) => {
  return (
    <div>
      <h1> {message}</h1>
    </div>
  )
}

export default LivingRoom
