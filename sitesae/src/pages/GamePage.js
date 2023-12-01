import React from 'react';
import Header from '../components/Header';
import createGame from '../createGame.png';
import joinGame from '../joinGame.png';
import { Link } from 'react-router-dom';

const GamePage = () => {
  function redirectPage() {
    window.location.href = 'http://127.0.0.1:5501/sitesae/public/game.html'
  }
  return (
    <div className='w-screen h-screen'>
      <Header></Header>
      <div className='rounded rounded-tr-[216px] rounded-bl-[216px] bg-card overflow-hidden shadow-2xl'>
        <div className='py-3 px-16'>
          <h1 className='flex justify-start items-center text-left font-face-gm font-bold uppercase text-7xl'>You want to play ?</h1>
          <h1 className='flex justify-start items-center text-left font-face-gm font-bold uppercase text-8xl'>Let's go !</h1>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className='flex justify-center items-center m-10 gap-10'>

            <div className='relative hover:scale-105 transition duration-500 object-cover'>
              <img src={createGame} className='opacity-80 blur-sm'></img>
              <Link to="/game-creation">
                <button className='bg-white rounded-full py-4 px-10 text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'> Create Game </button>
              </Link>
            </div>

            <div className='relative hover:scale-105 transition duration-500 object-cover'>
              <img src={joinGame} className='opacity-80 blur-sm'></img>
              <button className='bg-white rounded-full py-4 px-10 text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' onClick={redirectPage}> Join Game </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;