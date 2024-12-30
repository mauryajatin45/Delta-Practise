import FirstDiv from "./FirstDiv";
import SecondDiv from "./SecondDiv";
import ThirdDiv from "./ThirdDiv";
import "./Styles.css"

function App() {
  return (
    <>
      <div className="mainDiv">
        <FirstDiv />
        <SecondDiv />
        <ThirdDiv />
      </div>
    </>
  );
}

export default App;
