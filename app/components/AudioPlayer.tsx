/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState, useRef, useEffect } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { SpeakerWaveIcon } from '@heroicons/react/24/outline';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [showVolume, setShowVolume] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialisation de l'audio - seulement une fois au montage
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/Music.mp3');
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
      
      // Gestionnaire d'événements
      audioRef.current.addEventListener('canplaythrough', () => setIsLoaded(true));
      audioRef.current.addEventListener('ended', handleEnded);
    }

    // Nettoyage
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('canplaythrough', () => setIsLoaded(true));
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []); // Suppression de la dépendance volume
  const togglePlayPause = () => {
    if (!audioRef.current || !isLoaded) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error('Erreur de lecture audio:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };


  const handleEnded = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.error);
    }
  };

  return (
    <div className="fixed top-4 left-4 bg-black/80 backdrop-blur-sm p-4 rounded-lg shadow-lg flex items-center text-white space-x-4 z-[9999]">
      <button 
        onClick={togglePlayPause} 
        className="focus:outline-none hover:opacity-80 transition-opacity"
        disabled={!isLoaded}
      >
        {isPlaying ? (
          <PauseIcon className="w-6 h-6 text-white" />
        ) : (
          <PlayIcon className="w-6 h-6 text-white" />
        )}
      </button>
      
      <div 
        className="relative flex items-center space-x-2" 
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
      >
        <SpeakerWaveIcon className="w-5 h-5 text-white cursor-pointer" />
        <div className={`transition-all duration-300 overflow-hidden ${showVolume ? 'w-24 opacity-100' : 'w-0 opacity-0'}`}>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;