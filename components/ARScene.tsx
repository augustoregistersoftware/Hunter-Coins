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
    // Fix: Cast sceneEl to any to access the A-Frame specific 'hasLoaded' property.
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
      // Simplified AR.js config for better mobile compatibility in this markerless setup
      arjs="sourceType: webcam; trackingMethod: best; debugUIEnabled: false;"
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

      {/* 
        Let AR.js handle the camera. A cursor is added as a child
        to handle click/tap events on our treasures. This resolves
        conflicts and ensures the camera feed works correctly.
      */}
      <a-entity camera>
        <a-cursor
          color="#FFD700"
          fuse={false}
        ></a-cursor>
      </a-entity>


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