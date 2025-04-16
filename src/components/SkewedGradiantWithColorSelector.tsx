import { CSSProperties, useMemo, useState } from "react"
import * as THREE from "three"

import Gradients from "./Gradients"
import SkewedCanvas from "./SkewedCanvas"

const GRADIENTS = [
  ["#39A0ED", "#36F1CD", "#13C4A3"],
  ["#987D7C", "#A09CB0", "#A3B9C9"],
  ["#F76C5E", "#F68E5F", "#F5DD90"],
]

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
  const [gradientIndex, setGradientIndex] = useState(0)

  const colors = useMemo<[THREE.Color, THREE.Color, THREE.Color]>(() => {
    return [
      new THREE.Color(GRADIENTS[gradientIndex][0]),
      new THREE.Color(GRADIENTS[gradientIndex][1]),
      new THREE.Color(GRADIENTS[gradientIndex][2]),
    ]
  }, [gradientIndex])

  return (
    <div style={containerStyle}>
      <SkewedCanvas>
        <Gradients color0={colors[0]} color1={colors[1]} color2={colors[2]} />
      </SkewedCanvas>

      <ul style={listStyle}>
        {GRADIENTS.map((colors, index) => (
          <li key={index}>
            <button
              style={{
                background: `linear-gradient(to right, ${colors[0]} 33%, ${colors[1]} 33% 66%, ${colors[2]} 66%`,
                transform: `translateY(${(GRADIENTS.length - index) * 30}%)`,
                ...buttonStyle,
              }}
              onClick={() => setGradientIndex(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SkewedGradiantWithColorSelector
