import React from 'react';
import Header from '../components/Header';
import createGame from '../createGame.png';
import joinGame from '../joinGame.png';

const GameCreation = () => {
    return (
        <div>
            <Header></Header>
            <div className='flex flex-row justify-center gap-20 mt-20'>
                <div className='shadow-2xl'>
                    <img src={createGame}></img>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-2xl w-1/4 flex justify-center items-center">
                    <form>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-600 font-medium">Game Name</label>
                            <input type="email" id="email" className="w-full p-2 border rounded" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="numberOfPlayers" className="block text-gray-600 font-medium">Number of players</label>
                            <select id="numberOfPlayers" className="w-full p-2 border rounded">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>

                            </select>
                        </div>
                            <button type='submit' className="w-full bg-black text-white py-2 rounded mb-2">Create Game</button>
                            <a href='/game.html'>Create Game</a>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default GameCreation;