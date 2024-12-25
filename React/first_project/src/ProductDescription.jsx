function ProductDescription(props) {
  return <div style={{backgroundColor:"cyan", width:"100%"}}>
    <h2>{props.productName}</h2>
    <ul>
        <li>{props.feature1}</li>
        <li>{props.feature2}</li>
    </ul>
  </div>;
}


export default ProductDescription;