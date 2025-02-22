import { useState } from 'react';
import { uploadFile } from '../services/api';

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
      
      const formData = new FormData();
      formData.append('file', file);
      
      const taskId = await uploadFile(formData, (progress) => {
        setProgress(Math.round(progress * 100));
      });
      
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
      
      {error && <div className="error-message">{error}</div>}
      
      <button 
        onClick={handleSubmit}
        disabled={!file || progress > 0}
      >
        {progress > 0 ? `上传中 ${progress}%` : '开始建模'}
      </button>
    </div>
  );
}
