
import React from 'react';
import Radar from './Radar';
import { Treasure } from '../types';

interface HUDProps {
  score: number;
  treasures: Treasure[];
  onRestart: () => void;
}

const HUD: React.FC<HUDProps> = ({ score, treasures, onRestart }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none text-white p-4 md:p-6">
      <div className="flex justify-between items-start">
        {/* Score Display */}
        <div className="bg-black/50 p-3 rounded-lg pointer-events-auto">
          <h2 className="text-sm font-bold text-yellow-400">SCORE</h2>
          <p className="text-3xl font-bold">{score}</p>
        </div>

        {/* Restart Button */}
        <button
          onClick={onRestart}
          className="bg-red-600/80 hover:bg-red-500 text-white font-bold py-3 px-5 rounded-lg pointer-events-auto transition-colors"
        >
          Restart
        </button>
      </div>

      {/* Radar */}
      <div className="absolute bottom-6 left-6 pointer-events-auto">
        <Radar treasures={treasures} />
      </div>
    </div>
  );
};

export default HUD;
