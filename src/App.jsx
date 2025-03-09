import { useState } from 'react';
import UploadPanel from './components/UploadPanel';
import ModelViewer from './components/ModelViewer';
import SceneClassification from './components/SceneClassification';
import { createTask } from './services/api';
import useWebSocket from './hooks/useWebSocket';

export default function App() {
  const [taskId, setTaskId] = useState(null);
  const [modelUrl, setModelUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [classification, setClassification] = useState({ 
    sceneType: '', 
    confidence: 0 
  });

  useWebSocket(
    `ws://${import.meta.env.VITE_API_BASE_URL}/tasks/${taskId}/status`,
    (message) => {
      if (message.status === 'completed') {
        setModelUrl(message.model_url);
        setClassification({
          sceneType: message.scene_type,
          confidence: message.confidence
        });
      } else if (message.status === 'failed') {
        alert(`建模失败: ${message.error}`);
      }
    }
  );

  return (
    <div className="app-container">
      <header>
        <h1>智慧校园三维建模平台</h1>
        <p>支持格式：JPG/PNG/OBJ/GLB</p>
      </header>

      {modelUrl ? (
        <>
          <SceneClassification {...classification} />
          <ModelViewer modelUrl={modelUrl} />
        </>
      ) : (
        <UploadPanel 
          onUploadStart={() => setIsUploading(true)}
          onUploadSuccess={(tid) => {
            setTaskId(tid);
            setIsUploading(false);
          }}
        />
      )}

      {isUploading && (
        <div className="processing-overlay">
          <div className="processing-spinner"></div>
          <p>文件上传中，请稍候...</p>
        </div>
      )}
    </div>
  );
}
