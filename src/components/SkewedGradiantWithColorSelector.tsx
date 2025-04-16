import { CSSProperties, useMemo, useState } from "react"
import * as THREE from "three"

import Gradients from "./Gradients"
import SkewedCanvas from "./SkewedCanvas"

const COLORS = ["#ff0000", "#ff00ff", "#ffff00"]

const containerStyle: CSSProperties = {
  position: "relative",
}

const listStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  gap: "1.5rem",
  position: "absolute",
  bottom: "0",
  left: "50%",
  transform: "translateX(-50%) translateY(100%) skewY(-12deg) rotate(12deg)",
  zIndex: 10,
  listStyle: "none",
  padding: "0",
  margin: "0",
}

const buttonStyle: CSSProperties = {
  width: "4rem",
  height: "2.5rem",
  borderRadius: "0.4rem",
  border: "none",
  cursor: "pointer",
  outline: "none",
}

function SkewedGradiantWithColorSelector() {
  const [colorIndex, setColorIndex] = useState(0)

  const color = useMemo(() => {
    return new THREE.Color(COLORS[colorIndex])
  }, [colorIndex])

  return (
    <div style={containerStyle}>
      <SkewedCanvas>
        <Gradients color={color} />
      </SkewedCanvas>

      <ul style={listStyle}>
        {COLORS.map((color, index) => (
          <li key={index}>
            <button
              style={{
                backgroundColor: `${color}`,
                transform: `translateY(${(COLORS.length - index) * 30}%)`,
                ...buttonStyle,
              }}
              onClick={() => setColorIndex(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SkewedGradiantWithColorSelector
