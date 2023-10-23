import React from 'react';
import skateImage from '../skate.png';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const AccountPage = () => {
  return (
    <div>
      <Header></Header>
      <div className="flex flex-col items-center pt-10">
        <h1 className="text-2xl font-semibold mb-4 text-white">Personnal Informations</h1>
        <div className="w-1/2 p-10 border border-gray-300 rounded-lg shadow-md flex flex-row items-start text-white gap-10 space-x-4">
          <div className='flex flex-col gap-2 justify-start'>
            <div className="w-24 h-24 overflow-hidden rounded-full">
              <img src={skateImage} alt="Photo de profil" className="object-cover w-full h-full" />
            </div>
            <button className='text-white rounded-full p-2'>Edit picture</button>
          </div>
          <div className="flex-1 text-black">
            <div className="mb-4">
              <label htmlFor="username" className="block text-white font-medium">Username</label>
              <input type="text" id="username" className="w-full p-2 border rounded text-black" />
            </div>
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-white font-medium">First Name</label>
              <input type="text" id="firstName" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-white font-medium">Last Name</label>
              <input type="text" id="lastName" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-white font-medium">Email</label>
              <input type="email" id="email" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-white font-medium">Password</label>
              <input type="password" id="password" className="w-full p-2 border rounded" />
            </div>
            <div className="flex justify-end">
              <Link to="/game-training">
                <button className="bg-black text-white px-4 py-2 rounded-lg mr-2">Save</button>
              </Link>
              <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg">Delete account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
