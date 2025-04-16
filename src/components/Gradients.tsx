import * as THREE from "three"

function Gradients({
  color0,
  color1,
  color2,
}: {
  color0: THREE.Color
  color1: THREE.Color
  color2: THREE.Color
}) {
  return (
    <>
      <mesh position={[-1.5, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color0} />
      </mesh>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color1} />
      </mesh>
      <mesh position={[1.5, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color2} />
      </mesh>
    </>
  )
}

export default Gradients
