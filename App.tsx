
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Treasure, TreasureType } from './types';
import ARScene from './components/ARScene';
import HUD from './components/HUD';

const TREASURE_COUNT = 20;
const GAME_RADIUS = 10; // treasures will spawn in a 20x20 area

// Sound URLs
const AMBIENT_SOUND_URL = 'https://cdn.glitch.global/c7a5225c-5f89-425c-8911-a4358a9d6a36/ambient.mp3?v=1718721490161';
const COIN_SOUND_URL = 'https://cdn.glitch.global/c7a5225c-5f89-425c-8911-a4358a9d6a36/coin.wav?v=1718721493181';
const CHEST_SOUND_URL = 'https://cdn.glitch.global/c7a5225c-5f89-425c-8911-a4358a9d6a36/chest.wav?v=1718721495919';

const App: React.FC = () => {
  const [treasures, setTreasures] = useState<Treasure[]>([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  // --- Sound Refs ---
  const ambientSound = useRef<HTMLAudioElement | null>(null);
  const coinSound = useRef<HTMLAudioElement | null>(null);
  const chestSound = useRef<HTMLAudioElement | null>(null);
  
  // Preload sounds
  useEffect(() => {
    ambientSound.current = new Audio(AMBIENT_SOUND_URL);
    ambientSound.current.loop = true;
    ambientSound.current.volume = 0.15;

    coinSound.current = new Audio(COIN_SOUND_URL);
    chestSound.current = new Audio(CHEST_SOUND_URL);
  }, []);

  // --- Game State Effects for Audio ---
  useEffect(() => {
    // Autoplay for background audio can be tricky, this ensures it plays when game starts
    if (gameActive && ambientSound.current) {
      ambientSound.current.play().catch(error => {
        console.warn("Background audio playback failed. User interaction might be required.", error);
      });
    } else if (!gameActive && ambientSound.current) {
      ambientSound.current.pause();
      ambientSound.current.currentTime = 0;
    }

    // Cleanup on unmount
    return () => {
      if (ambientSound.current) {
        ambientSound.current.pause();
        ambientSound.current.currentTime = 0;
      }
    };
  }, [gameActive]);

  const generateTreasures = useCallback(() => {
    const newTreasures: Treasure[] = [];
    for (let i = 0; i < TREASURE_COUNT; i++) {
      newTreasures.push({
        id: i,
        type: Math.random() < 0.8 ? TreasureType.COIN : TreasureType.CHEST,
        position: {
          x: (Math.random() - 0.5) * 2 * GAME_RADIUS,
          y: Math.random() * 1.5 + 0.5, // 0.5 to 2 meters high
          z: (Math.random() - 0.5) * 2 * GAME_RADIUS - 3, // In front of the camera
        },
      });
    }
    setTreasures(newTreasures);
  }, []);

  const handleStartGame = useCallback(() => {
    generateTreasures();
    setScore(0);
    setGameActive(true);
  }, [generateTreasures]);

  const handleRestartGame = useCallback(() => {
    setGameActive(false);
    // A small delay to allow the AR scene to unmount gracefully before starting again
    setTimeout(() => {
        handleStartGame();
    }, 100);
  }, [handleStartGame]);

  const handleCollectTreasure = useCallback((treasureId: number) => {
    const collected = treasures.find(t => t.id === treasureId);
    if (collected) {
        // Play sound effect
        if (collected.type === TreasureType.COIN && coinSound.current) {
            coinSound.current.currentTime = 0;
            coinSound.current.play();
        } else if (collected.type === TreasureType.CHEST && chestSound.current) {
            chestSound.current.currentTime = 0;
            chestSound.current.play();
        }

        setScore(prevScore => prevScore + (collected.type === TreasureType.COIN ? 10 : 50));
        setTreasures(prevTreasures => prevTreasures.filter(t => t.id !== treasureId));
    }
  }, [treasures]);

  return (
    <div className={`w-screen h-screen ${!gameActive ? 'bg-black' : ''}`}>
      {gameActive ? (
        <>
          <ARScene treasures={treasures} onCollectTreasure={handleCollectTreasure} />
          <HUD score={score} treasures={treasures} onRestart={handleRestartGame} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full text-white">
          <h1 className="text-5xl font-bold mb-4 text-yellow-400">AR Treasure Hunt</h1>
          <p className="text-lg mb-8 max-w-md text-center text-gray-300">
            Use your camera to find and collect coins and treasure chests in the world around you.
          </p>
          <button
            onClick={handleStartGame}
            className="px-8 py-4 bg-yellow-500 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition-colors transform hover:scale-105"
          >
            Start Hunting
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
