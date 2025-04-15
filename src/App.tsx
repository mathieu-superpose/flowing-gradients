import "./App.css"

import SkewedCanvas from "./components/SkewedCanvas"
import Gradients from "./components/Gradients"

function App() {
  return (
    <div className="App">
      <h1>Skewed Canvas</h1>
      
      <SkewedCanvas>
        <Gradients />
      </SkewedCanvas>
    </div>
  )
}

export default App
