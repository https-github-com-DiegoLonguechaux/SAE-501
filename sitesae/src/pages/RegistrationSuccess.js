import React from 'react';
import Header from '../components/Header';
import check from '../check.png';
import { Link } from 'react-router-dom';

const RegistrationSuccess = () => {
    return (
        <div>
            <Header></Header>
            <div className="bg-white p-8 rounded-lg shadow-md w-1/4 mx-auto mt-16 flex flex-col gap-10">
                <div className='flex justify-center'>
                    <img src={check}></img>
                </div>
                <p className='text-black text-4xl text-center'>Account created successfully !</p>
                <p className='text-black text-xl text-center'>Now if you want to play, you have to login to your account.</p>
                <div className='flex justify-center gap-3'>
                    <Link to="/login-form">
                        <button type="submit" className="w-full bg-black text-white border py-2 px-4 rounded-xl">Login</button>
                    </Link>
                    <Link to="/">
                        <button type="submit" className="w-full bg-black text-white border py-2 px-4 rounded-xl">Close</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegistrationSuccess;