function Production({ price }) {

    let color = {color: price > 250 && "green"}
    return (
      <>
        <p style={color}>Price: {price}</p>
      </>
    );
  }
  
  export default Production;
  