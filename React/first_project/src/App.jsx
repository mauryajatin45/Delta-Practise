import "./App.css";
import Product from "./Product";

function App() {
  return (
    <div style={{display:"flex", gap:"20px"}}>
      <Product productName="Logitech MX Master 35" feature1="8,000 DPI" feature2="5 Programmable Buttons" oldprice="12,495" newprice="8,999" />
      <Product productName="Apple Pencil(2nd Gen)" feature1="Intutive touch surface" feature2="Designed for ipad Pro" oldprice="11,900" newprice="9,199" />
      <Product productName="Zebronics Zeb-Transformer" feature1="Intutive touch surface" feature2="Designed for ipad Pro" oldprice="1,599" newprice="899" />
      <Product productName="protronics Toad 23 Wireless Mouse" feature1="wireless Mouse 2.4GHz" feature2="Optical Orientation" oldprice="599" newprice="278" />
    </div>
  );
}

export default App;
