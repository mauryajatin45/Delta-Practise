import { useState } from "react"

export default function Counter(){

    Counter(){
        console.log("Counter created and called successfully, Hiten ");
    }

    let [Count, setCount] = useState(0);

    function incCount() {
        setCount(Count+1)
    }


    function decCount() {
        setCount(Count-1)
    }

return (
    <div>
        <h1>count : {Count}</h1>
        <button onClick={incCount} >Increment</button>
        <br />
        <br />
        <button onClick={decCount}>Decrement</button>
    </div>
)

}