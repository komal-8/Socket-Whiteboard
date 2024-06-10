// Whiteboard.js

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

function Whiteboard() {
  const [drawing, setDrawing] = useState([]);

  useEffect(() => {
    socket.on('draw', (data) => {
      setDrawing((prevDrawing) => [...prevDrawing, data]);
    });

    return () => {
      socket.off('draw');
    };
  }, []);

  const handleDraw = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const data = { x: offsetX, y: offsetY };
    setDrawing((prevDrawing) => [...prevDrawing, data]);
    socket.emit('draw', data);
  };

  return (
    <div className="whiteboard" onMouseMove={handleDraw}>
      {drawing.map((point, index) => (
        <div key={index} className="point" style={{ left: point.x, top: point.y }}></div>
      ))}
    </div>
  );
}

export default Whiteboard;
