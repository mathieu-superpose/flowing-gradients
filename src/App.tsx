import { CSSProperties } from "react"

import "./App.css"

import SkewedGradiantWithColorSelector from "./components/SkewedGradiantWithColorSelector"

const titleSectionStyle: CSSProperties = {
  padding: "50px",
}

function App() {
  return (
    <div className="App">
      <section style={titleSectionStyle}>
        <h1>Skewed Canvas</h1>
      </section>
      <section>
        <SkewedGradiantWithColorSelector />
      </section>
    </div>
  )
}

export default App
