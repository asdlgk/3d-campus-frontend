import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function ModelViewer({ modelUrl }) {
  return (
    <div className="model-viewer">
      <Suspense fallback={<div className="loading">模型加载中...</div>}>
        <Canvas camera={{ position: [8, 8, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Model url={modelUrl} />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxDistance={20}
            minDistance={3}
          />
          <gridHelper args={[20, 20]} />
        </Canvas>
      </Suspense>
      
      <div className="viewer-controls">
        <button onClick={() => window.location.reload()}>
          新建任务
        </button>
      </div>
    </div>
  );
}
