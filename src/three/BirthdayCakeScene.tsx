import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { siteConfig } from '../config/siteConfig'
import { useReducedMotion } from '../hooks/useReducedMotion'

function Flame({ lit, reduced }: { lit: boolean; reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current || !lit || reduced) return
    ref.current.scale.y = 1 + Math.sin(clock.elapsedTime * 8) * 0.15
  })
  if (!lit) return null
  return (
    <mesh ref={ref} position={[0, 0.35, 0]}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshStandardMaterial emissive="#ffb347" emissiveIntensity={2} color="#ffd27a" />
    </mesh>
  )
}

function Smoke({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current || reduced) return
    const progress = clock.elapsedTime % 1.2
    ref.current.position.y = 0.34 + progress * 0.18
    const material = ref.current.material as THREE.MeshBasicMaterial
    material.opacity = Math.max(0, 0.45 - progress * 0.38)
  })

  return (
    <mesh ref={ref} position={[0, 0.34, 0]}>
      <sphereGeometry args={[0.045, 10, 10]} />
      <meshBasicMaterial color="#f5dce4" transparent opacity={0.4} depthWrite={false} />
    </mesh>
  )
}

function Candle({
  position,
  lit,
  reduced,
}: {
  position: [number, number, number]
  lit: boolean
  reduced: boolean
}) {
  return (
    <group position={position}>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3, 12]} />
        <meshStandardMaterial color="#f5ece4" />
      </mesh>
      {lit ? <Flame lit reduced={reduced} /> : <Smoke reduced={reduced} />}
    </group>
  )
}

function CakeModel({
  litCandles,
  reduced,
}: {
  litCandles: boolean[]
  reduced: boolean
}) {
  return (
    <group position={[0, -0.4, 0]}>
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.1, 1.2, 0.45, 32]} />
        <meshStandardMaterial color="#6b3a45" roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.95, 1, 0.4, 32]} />
        <meshStandardMaterial color="#8a4f5a" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 0.85, 0.35, 32]} />
        <meshStandardMaterial color="#a86570" roughness={0.45} />
      </mesh>
      <Candle position={[-0.35, 1.05, 0.2]} lit={litCandles[0]} reduced={reduced} />
      <Candle position={[0, 1.05, -0.15]} lit={litCandles[1]} reduced={reduced} />
      <Candle position={[0.35, 1.05, 0.2]} lit={litCandles[2]} reduced={reduced} />
    </group>
  )
}

type BirthdayCakeSceneProps = {
  onCelebration: () => void
}

export function BirthdayCakeScene({ onCelebration }: BirthdayCakeSceneProps) {
  const [lit, setLit] = useState([true, true, true])
  const [celebrating, setCelebrating] = useState(false)
  const reduced = useReducedMotion()
  const dpr = useMemo(() => Math.min(window.devicePixelRatio, 1.5), [])

  const blow = () => {
    if (celebrating) return
    const idx = lit.findIndex(Boolean)
    if (idx === -1) return
    const next = [...lit]
    next[idx] = false
    setLit(next)
    if (next.every((candle) => !candle)) {
      setCelebrating(true)
      onCelebration()
    }
  }

  return (
    <div className="relative h-[360px] w-full max-w-lg">
      <Canvas
        shadows
        dpr={dpr}
        frameloop={reduced ? 'demand' : 'always'}
        camera={{ position: [2.2, 1.8, 2.8], fov: 42 }}
      >
        <color attach="background" args={['#7f3052']} />
        <ambientLight intensity={0.35} />
        <spotLight position={[4, 6, 2]} angle={0.4} penumbra={0.5} intensity={1.2} castShadow />
        <pointLight position={[-2, 3, 1]} intensity={0.6} color="#ffb088" />
        <CakeModel litCandles={lit} reduced={reduced} />
        <ContactShadows opacity={0.45} scale={8} blur={2} far={4} />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
      {!celebrating ? (
        <button
          type="button"
          className="absolute bottom-2 left-1/2 w-[90%] -translate-x-1/2 rounded-full border border-champagne/30 bg-midnight/80 py-3 font-body text-xs text-champagne backdrop-blur-md"
          onClick={blow}
        >
          Make a wish — tap to blow out the candles
        </button>
      ) : (
        <p className="absolute bottom-4 left-0 right-0 text-center font-display text-2xl text-champagne">
          Happy Birthday To You my dear, {siteConfig.girlfriendName} 🥰
        </p>
      )}
    </div>
  )
}
