import Production from "./production";

function productionTab() {
  return (
    <>
    <div className="maincontainer">
    <Production price="200" /> 
    <Production price="300" /> 
    <Production price="400" /> 
    </div>
    </>
  );
}

export default productionTab;
