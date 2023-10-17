import React from 'react';
import Header from '../components/Header';

const LoginForm = () => {
  return (
    <div>
      <Header></Header>
      <div className="bg-white p-8 rounded-lg shadow-md w-1/4 mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-4 text-center">Connexion</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
            <input type="email" id="email" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 font-medium">Password</label>
            <input type="password" id="password" className="w-full p-2 border rounded" />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-yellow-500 hover:text-black mb-2"
          >
            Log In
          </button>
        </form>
        <p className="text-gray-600 text-center my-4">New member ? <a href="/inscription" className="text-yellow-500">Create an account</a></p>
      </div>
    </div>
  );
};

export default LoginForm;
