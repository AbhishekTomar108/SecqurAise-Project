import Container from "./component/Container";
import "./style/style.css"
import NumberState from "./context/NumberState.js"


function App() {
  return (
    <div className="App">
      <NumberState>
    <Container/>
    </NumberState>
    </div>
  );
}

export default App;
