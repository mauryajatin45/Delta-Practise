import "./Production.css";

function Production(props, {price}) {

  let color = {backgroundColor: "Lime"} ;
  return (
    <>
      <div className="production">
        <h3>Title : {props.title}</h3>
        <p>Description : {props.description}</p>
        <p>Price : {price}</p>
      </div>
    </>
  );
}

export default Production;
