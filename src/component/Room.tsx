import { useState } from "react"

function useCounter (initialValue : number){

    const[count,setCount] = useState(initialValue);

    const increment = () => setCount(count +1);
    const decrement = () => setCount (count -1);

    return {count,increment,decrement}
}


const Room = () => {
  const {count,increment,decrement} =useCounter(0)

  
    return (
     <div>


        <h1> Esta es la habitacion! {count}</h1>

        <button onClick={increment}>Incrementa</button>
        <button onClick = {decrement}> Decrementa</button>

     </div> 
  )
}

export default Room
