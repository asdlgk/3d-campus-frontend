export default function SceneClassification({ sceneType, confidence }) {
  return (
    <div className="scene-classification">
      <h3>场景识别结果</h3>
      <p>类型：{sceneType}（置信度：{confidence}%）</p>
    </div>
  );
}
