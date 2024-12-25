function MsgBox(props) {

    let txtcolor = props.color;

    return (
      <>
        <h1 style={{backgroundColor : "pink" , color:txtcolor}}>Hello, {props.userName}</h1>
      </>
    );
  }
  
  export default MsgBox;
  