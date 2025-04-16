import * as THREE from "three"
import { extend, useThree } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"
import { useMemo } from "react"

const GradientMaterial = shaderMaterial(
  {
    uColor0: { value: new THREE.Color(0x000000) },
  },
  /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,
  /* glsl */ `
  uniform vec3 uColor0;
  uniform vec3 uColor1;
  uniform vec3 uColor2;

  varying vec2 vUv;

  const float FREQUENCY = 8.0;
  
  void main() {
    float repeatedX = mod(vUv.x * FREQUENCY, 1.0); // Repeat vUv.y based on FREQUENCY
    vec3 color;

    if (repeatedX < 0.33) {
      color = uColor0;
    } else if (repeatedX < 0.66) {
      color = uColor1;
    } else {
      color = uColor2;
    }

    gl_FragColor = vec4(color, 1.0);
  }
`
)

extend({ GradientMaterial })

function Gradients({
  color0,
  color1,
  color2,
}: {
  color0: THREE.Color
  color1: THREE.Color
  color2: THREE.Color
}) {
  const { size, viewport } = useThree()
  const aspect = size.width / size.height

  const material = useMemo(() => {
    const mat = new GradientMaterial()

    mat.uniforms.uColor0 = new THREE.Uniform(color0)
    mat.uniforms.uColor1 = new THREE.Uniform(color1)
    mat.uniforms.uColor2 = new THREE.Uniform(color2)

    return mat
  }, [aspect, color0, color1, color2])

  return (
    <>
      <mesh scale={[viewport.width, viewport.height, 1]} material={material}>
        <planeGeometry args={[1, 1]} />
      </mesh>
    </>
  )
}

export default Gradients
