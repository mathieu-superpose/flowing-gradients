import { Canvas } from "@react-three/fiber"

const skewedStyle = {
  width: "100%",
  height: "max(30vh, 300px)",
  transform: "skewY(-6deg)",
  overflow: "hidden",
  background: "#2222aa",
}

function SkewedCanvas({ children }: { children: React.ReactNode }) {
  return (
    <div style={skewedStyle}>
      <Canvas>{children}</Canvas>
    </div>
  )
}

export default SkewedCanvas
