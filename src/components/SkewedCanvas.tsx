import { Canvas } from "@react-three/fiber"

const skewedStyle = {
  width: "100%",
  height: "max(30vh, 300px)",
  transform: "skewY(-6deg)",
  overflow: "hidden",
  background: "#2222aa",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const containerStyle = {
  width: "100%",
  height: "200%",
  transform: "skewY(6deg)",
}

function SkewedCanvas({ children }: { children: React.ReactNode }) {
  return (
    <div style={skewedStyle}>
      <div style={containerStyle}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} />

          {children}
        </Canvas>
      </div>
    </div>
  )
}

export default SkewedCanvas
