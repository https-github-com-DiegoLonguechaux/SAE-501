import React from 'react';
import createGame from '../createGame.png';
import joinGame from '../joinGame.png';

const TwoImagesWithButtons = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="relative">
        <img
          src={createGame}
          alt="Image 1"
          className="w-2/3 h-auto"
        />
        <button className="bg-white text-black text-xl py-2 px-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full">
          Bouton 1
        </button>
      </div>
      <div className="relative">
        <img
          src={joinGame}
          alt="Image 2"
          className="w-2/3 h-auto"
        />
        <button className="bg-white text-black text-xl py-2 px-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full">
          Bouton 2
        </button>
      </div>
    </div>
  );
};

export default TwoImagesWithButtons;
