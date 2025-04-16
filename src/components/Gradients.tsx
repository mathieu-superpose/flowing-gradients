import * as THREE from "three"
import { extend, useFrame, useThree } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"
import { useMemo } from "react"

const GradientMaterial = shaderMaterial(
  {
    uColor0: { value: new THREE.Color(0x000000) },
    uTime: 0,
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

  uniform float uTime;

  varying vec2 vUv;

  const float FREQUENCY = 8.0;
  const float SPEED_RATIO = 0.05;

  const float A = 15.0;
  const float L = 75.0;

  const float AMPLITUDE = 1.0;
  
  // // animated gradients
  // void main() {
  //   float repeatedX = mod((uTime * SPEED_RATIO + vUv.x) * FREQUENCY, 1.0); // Repeat vUv.y based on FREQUENCY
  //   vec3 color;

  //   if (repeatedX < 0.33) {
  //     color = uColor0;
  //   } else if (repeatedX < 0.66) {
  //     color = uColor1;
  //   } else {
  //     color = uColor2;
  //   }

  //   gl_FragColor = vec4(color, 1.0);
  // }

  // sin wave
  void main() {
    // Calculate the sine wave based on vUv.x and FREQUENCY
    float wave = sin(vUv.x * FREQUENCY * 3.141592653589793238 + uTime) / 4.0 - 0.5;

    // Determine the alpha value based on the wave shape
    float alpha = smoothstep(-AMPLITUDE, AMPLITUDE, wave - vUv.y);

    // Set the color and alpha
    gl_FragColor = vec4(uColor0, alpha);
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

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.getElapsedTime()
  })

  return (
    <>
      <mesh scale={[viewport.width, viewport.height, 1]} material={material}>
        <planeGeometry args={[1, 1]} />
      </mesh>
    </>
  )
}

export default Gradients
