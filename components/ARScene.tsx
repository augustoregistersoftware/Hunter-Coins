/// <reference path="../aframe.d.ts" />
import React, { useEffect } from 'react';
import { Treasure } from '../types';
import TreasureComponent from './Treasure';

interface ARSceneProps {
  treasures: Treasure[];
  onCollectTreasure: (treasureId: number) => void;
}

const ARScene: React.FC<ARSceneProps> = ({ treasures, onCollectTreasure }) => {

  // 🚀 Garantir que o AR.js inicie corretamente no mobile
  useEffect(() => {
    const sceneEl = document.querySelector('a-scene');
    if (sceneEl && sceneEl.hasLoaded) return;

    if (sceneEl) {
      sceneEl.addEventListener('loaded', () => {
        console.log('✅ AR.js Scene loaded on mobile');
      });
    }
  }, []);

  return (
    <a-scene
      embedded
      // AR.js config — compatível com mobile
      arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false; 
            patternRatio: 0.8; detectionMode: mono_and_matrix;"
      device-orientation-permission-ui="enabled: true"
      vr-mode-ui="enabled: false"
      renderer="colorManagement: true; physicallyCorrectLights: true; alpha: true;"
      style={{
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    >
      {/* Luz ambiente e direcional */}
      <a-entity light="type: ambient; color: #BBB"></a-entity>
      <a-entity
        light="type: directional; color: #FFF; intensity: 0.9"
        position="-1 2 1"
      ></a-entity>

      {/* Câmera — o AR.js controla, mas forçamos o look-controls para suavidade */}
      <a-camera
        look-controls
        position="0 0 0"
        rotation="0 0 0"
        wasd-controls="enabled: false"
      ></a-camera>

      {/* Tesouros */}
      {treasures.map((treasure) => (
        <TreasureComponent
          key={treasure.id}
          treasure={treasure}
          onCollect={onCollectTreasure}
        />
      ))}
    </a-scene>
  );
};

export default ARScene;
