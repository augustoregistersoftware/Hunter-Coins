
import React from 'react';
import { Treasure, TreasureType } from '../types';

interface RadarProps {
  treasures: Treasure[];
}

const RADAR_SIZE = 128; // in pixels
const RADAR_RANGE = 10; // in meters (matches game radius)

const Radar: React.FC<RadarProps> = ({ treasures }) => {
  return (
    <div
      className="relative bg-black/60 border-2 border-cyan-400/50 rounded-full"
      style={{ width: `${RADAR_SIZE}px`, height: `${RADAR_SIZE}px` }}
    >
      {/* Player Dot (Center) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full"></div>

      {/* Treasure Dots */}
      {treasures.map((treasure) => {
        // Calculate position on the 2D radar plane (X and Z coordinates)
        const x = treasure.position.x;
        const z = treasure.position.z;

        // Clamp distance to radar range to keep dots within the circle
        const distance = Math.sqrt(x * x + z * z);
        const clampedDistance = Math.min(distance, RADAR_RANGE);
        const angle = Math.atan2(z, x);

        const radarX = (clampedDistance / RADAR_RANGE) * (RADAR_SIZE / 2) * Math.cos(angle) + RADAR_SIZE / 2;
        const radarY = (clampedDistance / RADAR_RANGE) * (RADAR_SIZE / 2) * Math.sin(angle) + RADAR_SIZE / 2;
        
        const isChest = treasure.type === TreasureType.CHEST;
        const color = isChest ? 'bg-fuchsia-500' : 'bg-yellow-400';
        const size = isChest ? 'w-2.5 h-2.5' : 'w-1.5 h-1.5';
        const zIndex = isChest ? 10 : 5;

        return (
          <div
            key={treasure.id}
            className={`absolute rounded-full ${color} ${size}`}
            style={{
              left: `${radarX}px`,
              top: `${radarY}px`,
              transform: 'translate(-50%, -50%)',
              zIndex: zIndex
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default Radar;
