import { useState } from "react";

export default function Ludo() {

    let [moves, setMoves] = useState({green:0, blue:0, red:0, yellow:0});

    let GreenMoves =  ()=>{
        setMoves({...moves, green:moves.green+1})
    }

  return (<>
    <div>
      <h1>Let's begin</h1>
    </div>
    <div>
        <p>Green moves = {moves.green}</p>
        <button style={{backgroundColor:"green"}} onClick={GreenMoves}>+1</button>
        <p>Blue moves = </p>
        <button style={{backgroundColor:"blue"}}>+1</button>
        <p>Red moves = </p>
        <button style={{backgroundColor:"red"}}>+1</button>
        <p>Yellow moves = </p>
        <button style={{backgroundColor:"yellow", color:"black"}}>+1</button>
    </div>
    </>
  );
}
