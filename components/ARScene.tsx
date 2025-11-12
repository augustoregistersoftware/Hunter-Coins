/// <reference path="../aframe.d.ts" />
import React from 'react';
import { Treasure } from '../types';
import TreasureComponent from './Treasure';

interface ARSceneProps {
  treasures: Treasure[];
  onCollectTreasure: (treasureId: number) => void;
}

const ARScene: React.FC<ARSceneProps> = ({ treasures, onCollectTreasure }) => {
  return (
    <a-scene
      embedded
      arjs="sourceType: webcam; debugUIEnabled: false;"
      renderer="colorManagement: true; alpha: true;"
      vr-mode-ui="enabled: false"
      style={{ height: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0 }}
    >
      {/* Lighting */}
      <a-entity light="type: ambient; color: #BBB"></a-entity>
      <a-entity light="type: directional; color: #FFF; intensity: 0.8" position="-1 2 1"></a-entity>

      {/* Camera */}
      <a-camera position="0 0 0" look-controls></a-camera>

      {/* Treasures */}
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
