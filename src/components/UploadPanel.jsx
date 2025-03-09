import { useState } from 'react';
import { getOSSPolicy, uploadToOSS, createTask } from '../services/api';
import Alert from './Alert';

export default function UploadPanel({ onUploadStart, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!file) {
      setError('请先选择文件');
      return;
    }

    try {
      onUploadStart();
      setError('');
      
      // OSS直传逻辑
      const policy = await getOSSPolicy();
      await uploadToOSS(file, policy);
      const taskId = await createTask(policy.filePath);
      
      onUploadSuccess(taskId);
    } catch (err) {
      setError('文件上传失败: ' + err.message);
    }
  };

  return (
    <div className="upload-panel">
      <div className="file-input">
        <label>
          {file ? file.name : '选择建模文件'}
          <input 
            type="file" 
            accept=".jpg,.png,.obj,.glb"
            onChange={(e) => setFile(e.target.files[0])}
            hidden
          />
        </label>
      </div>
      
      {error && <Alert type="error" message={error} />}
      
      <button 
        onClick={handleSubmit}
        disabled={!file || progress > 0}
      >
        {progress > 0 ? `上传中 ${progress}%` : '开始建模'}
      </button>

      {progress > 0 && (
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}
