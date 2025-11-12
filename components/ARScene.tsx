// FIX: Add a triple-slash reference to the A-Frame type definitions to make TypeScript aware of the custom elements.
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
      vr-mode-ui="enabled: false"
      // Configuração do AR.js para rastreamento sem marcadores (markerless)
      arjs="sourceType: webcam; trackingMethod: best; debugUIEnabled: false;"
      renderer="colorManagement: true; antialias: true;"
      // O atributo 'embedded' é crucial para sobrepor elementos HTML
      embedded
      style={{ height: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0 }}
    >
      {/* O AR.js irá gerenciar a câmera, então não precisamos adicionar uma manualmente */}

      {/* Iluminação */}
      <a-entity light="type: ambient; color: #BBB"></a-entity>
      <a-entity light="type: directional; color: #FFF; intensity: 0.8" position="-1 2 1"></a-entity>

      {/* Tesouros */}
      {treasures.map(treasure => (
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