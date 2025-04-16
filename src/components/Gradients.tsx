import * as THREE from "three"

function Gradients({ color }: { color: THREE.Color }) {
  return (
    <>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </>
  )
}

export default Gradients
