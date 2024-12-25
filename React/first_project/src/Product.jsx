import React from 'react';
import ProductDescription from "./ProductDescription";
import ProductPrice from "./ProductPrice";
import './Product.css'; // Make sure the CSS file is imported correctly

function Product(props) {
  return (
    <div className="IndividualProduct">
      <ProductDescription
        productName={props.productName}
        feature1={props.feature1}
        feature2={props.feature2}
      />
      <ProductPrice oldprice={props.oldprice}  newprice={props.newprice}/>
    </div>
  );
}

export default Product;
