function ProductPrice(props){

    return (
        <div style={{backgroundColor:"goldenrod", width:"100%", display:"flex", gap:"20px", justifyContent:"space-evenly"}}>
            <h3 style={{textDecoration:"line-through"}}>₹{props.oldprice}</h3>
            <h3>₹{props.newprice}</h3>
        </div>
    );

}

export default ProductPrice;