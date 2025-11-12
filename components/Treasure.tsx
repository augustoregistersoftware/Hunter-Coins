/// <reference path="../aframe.d.ts" />
import React from 'react';
import { Treasure, TreasureType } from '../types';

interface TreasureProps {
  treasure: Treasure;
  onCollect: (treasureId: number) => void;
}

const TreasureComponent: React.FC<TreasureProps> = ({ treasure, onCollect }) => {
  const { id, type, position } = treasure;
  const positionStr = `${position.x} ${position.y} ${position.z}`;

  const handleClick = () => {
    onCollect(id);
  };

  return (
    <a-entity position={positionStr} onClick={handleClick}>
      {type === TreasureType.COIN && (
        <a-entity>
          <a-cylinder
            color="#FFD700"
            radius="0.2"
            height="0.05"
            rotation="90 0 0"
          ></a-cylinder>
           <a-animation 
            attribute="rotation" 
            dur="3000" 
            to="0 360 0" 
            repeat="indefinite" 
            easing="linear">
           </a-animation>
        </a-entity>
      )}
      {type === TreasureType.CHEST && (
        <a-entity scale="0.3 0.3 0.3">
          {/* Base */}
          <a-box color="#8B4513" depth="0.8" height="0.6" width="1"></a-box>
          {/* Lid */}
          <a-box color="#A0522D" depth="0.8" height="0.4" width="1" position="0 0.5 0"></a-box>
           {/* Lock */}
          <a-box color="#FFD700" depth="0.85" height="0.15" width="0.2" position="0 0.25 0"></a-box>
        </a-entity>
      )}
    </a-entity>
  );
};

export default TreasureComponent;