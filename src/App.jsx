import { useState, useEffect } from 'react';
import UploadPanel from './components/UploadPanel';
import ModelViewer from './components/ModelViewer';
import { checkTaskStatus } from './services/api';

export default function App() {
  const [taskId, setTaskId] = useState(null);
  const [modelUrl, setModelUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!taskId) return;

    const interval = setInterval(async () => {
      try {
        const result = await checkTaskStatus(taskId);
        if (result.status === 'completed') {
          clearInterval(interval);
          setModelUrl(result.model_url);
        } else if (result.status === 'failed') {
          clearInterval(interval);
          alert('建模失败: ' + result.error);
        }
      } catch (error) {
        console.error('状态检查失败:', error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [taskId]);

  return (
    <div className="app-container">
      <header>
        <h1>智慧校园三维建模平台</h1>
        <p>支持格式：JPG/PNG/OBJ/GLB</p>
      </header>

      {modelUrl ? (
        <ModelViewer modelUrl={modelUrl} />
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
