import React from 'react';
import Header from '../components/Header';
import createGame from '../createGame.png';
import joinGame from '../joinGame.png';
import { Link } from 'react-router-dom';

const GamePage = () => {
  return (
    <div>
      <Header></Header>
      <div className='flex flex-row justify-center gap-20 mt-20'>
        <div className='relative'>
            <img src={createGame} className='opacity-50 blur-sm'></img>
            <Link to="/game-creation">
              <button className='bg-white rounded-full py-4 px-10 text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'> Create Game </button>
            </Link>
        </div>

        <div className='relative'>
            <img src={joinGame} className='opacity-50 blur-sm'></img>
            <Link to="/game-training">
              <button className='bg-white rounded-full py-4 px-10 text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'> Join Game </button>
            </Link>  
        </div>
      </div>
    </div>
  );
};

export default GamePage;