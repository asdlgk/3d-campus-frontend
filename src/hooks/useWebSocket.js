import { useEffect } from 'react';

export default function useWebSocket(url, onMessage) {
  useEffect(() => {
    const ws = new WebSocket(url);
    ws.onmessage = (event) => onMessage(JSON.parse(event.data));
    return () => ws.close();
  }, [url, onMessage]);
}
