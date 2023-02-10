import { Suspense, useRef } from 'react'
import { useAspect, useVideoTexture, useTexture } from '@react-three/drei'

export default function Video() {
  const size = useAspect(180, 100)
  return (
    <mesh scale={size}>
      <planeGeometry />
      <Suspense fallback={<FallbackMaterial url="logo192.png" />}>
        <VideoMaterial url="PunkRockSinatra.mp4" />
      </Suspense>
    </mesh>
  )
}

function VideoMaterial({ url }) {
  const texture = useVideoTexture(url)
  return (
    <>
      <meshBasicMaterial map={texture} toneMapped={false} />
    </>
  )
}


function FallbackMaterial({ url }) {
  const texture = useTexture(url)
  return <meshBasicMaterial map={texture} toneMapped={false} />
}
