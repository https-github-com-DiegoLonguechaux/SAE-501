import React from 'react';
import Header from '../components/Header';

const SignUpForm = () => {
  return (
    <div className='min-h-screen'>
        <Header></Header>
        <div className="bg-white p-8 rounded shadow-md w-1/4 mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-4 text-center">Create an account</h2>
        <form>
            <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 font-medium">Username</label>
            <input type="text" id="username" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-600 font-medium">First Name</label>
            <input type="text" id="firstName" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-600 font-medium">Last Name</label>
            <input type="text" id="lastName" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
            <input type="email" id="email" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 font-medium">Password</label>
            <input type="password" id="password" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-600 font-medium">Confirm Password</label>
            <input type="password" id="confirmPassword" className="w-full p-2 border rounded" />
            </div>
            <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-yellow-500 hover:text-black mb-2"
            >
            Create an account
            </button>
        </form>
        </div>
    </div>
  );
};

export default SignUpForm;
