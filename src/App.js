import './App.css';
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshReflectorMaterial, BakeShadows, useGLTF } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import { easing } from 'maath'
import Computers, {Instances} from '../src/components/Computers'

function CameraRig() {
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [-1 + (state.pointer.x * state.viewport.width) / 3, (1 + state.pointer.y) / 2, 5.5], 0.5, delta)
    state.camera.lookAt(0, 0, 0)
  })
}

function App() {
  const spotify = useGLTF('/spotify_logo.glb')
  const apple = useGLTF('/apple_music_logo.glb') 
  const instagram = useGLTF('/instagram_3d-icon.glb') 

  return (
    <div className="App">
      <Canvas style={{width: 'auto', height: '50vw'}} shadows dpr={[1, 1.5]} camera={{ position: [-1.5, 1, 5.5], fov: 45, near: 1, far: 20 }}>
      {/* Lights */}
      <color attach="background" args={['black']} />
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight position={[10, 20, 10]} angle={0.12} penumbra={1} intensity={1} castShadow shadow-mapSize={1024} />
      {/* <Sphere/> */}
      {/* Main scene */}
        <group position={[-0, -1, 0]}>
          {/* sketchfab model */}
          <Instances>
            <Computers scale={0.5} />
          </Instances>
          {/* Plane reflections + distance blur */}
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 30]}
              resolution={2048}
              mixBlur={1}
              mixStrength={80}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#202020"
              metalness={0.8}
            />
          </mesh>
        </group>
        {/* SPOTIFY */}
        <mesh onClick={() => window.location.href = "https://open.spotify.com/playlist/32EODbloE7xbHbGZs5mdbG?si=2af870906e4f42b0"} castShadow position={[-1,-0.72,0.15]} rotation={[1.5,5,0]}>
          <primitive object={spotify.scene} scale={0.25} />
        </mesh>
        {/* APPLE MUSIC */}
        <mesh onClick={() => window.location.href = "https://music.apple.com/us/playlist/charlie-virgo/pl.u-V9D7mXGUB0NYDa"} castShadow position={[-0.25,-0.72,0.15]} rotation={[0,0,0]}>
          <primitive object={apple.scene} scale={0.25} />
        </mesh>
        {/* INSTAGRAM */}
        <mesh onClick={() => window.location.href = "https://open.spotify.com/playlist/32EODbloE7xbHbGZs5mdbG?si=2af870906e4f42b0"} castShadow position={[0.5,-0.72,0.15]} rotation={[0,-1.5,0]}>
          <primitive object={instagram.scene} scale={0.25} />
        </mesh>
      {/* Postprocessing */}
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={4} />
        <DepthOfField target={[0, 0, 13]} focalLength={0.3} bokehScale={15} height={700} />
      </EffectComposer>
      {/* Camera movements */}
      <CameraRig/>
      {/* Small helper that freezes the shadows for better performance */}
      <BakeShadows />
    </Canvas>
    </div>
  );
}

export default App;
