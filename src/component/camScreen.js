import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ src }) => {
  const videoRef = useRef();
  const [hls, setHls] = useState(null);

  useEffect(() => {
    const initializeHls = () => {
      if (Hls.isSupported()) {
        const hlsInstance = new Hls();
        hlsInstance.loadSource(src);
        hlsInstance.attachMedia(videoRef.current);
        setHls(hlsInstance);
      }
    };

    initializeHls();

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  const reloadM3U8 = () => {
    if (hls) {
      hls.destroy();
      const newHls = new Hls();
      newHls.loadSource(src);
      newHls.attachMedia(videoRef.current);
      setHls(newHls);
    }
  };

  return (
    <div>
      <video ref={videoRef} controls />
      
    </div>
  );
};

export default VideoPlayer;
