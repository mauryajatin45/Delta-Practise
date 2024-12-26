export default function Button() {
  return (
    <div>
  <button onClick={clickkarbhai}>Click Me!!!</button>
  <p onMouseOver={hoverkarbhai}>Hover Me!!!</p>

  </div>
  );
}

function clickkarbhai() {
  console.log("Button Clicked");
}

function hoverkarbhai(){
    console.log("Hover hua ha bhai")
}
