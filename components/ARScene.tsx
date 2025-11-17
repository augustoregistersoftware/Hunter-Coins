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
    // FIX: Cast sceneEl to any to access A-Frame specific properties.
    if (sceneEl && (sceneEl as any).hasLoaded) return;

    if (sceneEl) {
      sceneEl.addEventListener('loaded', () => {
        console.log('✅ AR.js Scene loaded on mobile');
      });
    }
  }, []);

  return (
    <a-scene
      embedded
      // AR.js config simplificada para melhor compatibilidade markerless
      arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;"
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

      {/* Câmera com cursor para melhor interatividade */}
      <a-camera
        look-controls
        position="0 0 0"
        rotation="0 0 0"
        wasd-controls="enabled: false"
      >
        <a-entity
            cursor="fuse: false;"
            position="0 0 -1"
            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03;"
            material="color: #00BCD4; shader: flat; opacity: 0.7;"
        />
      </a-camera>

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