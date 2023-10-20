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
                    {/* <svg width="156" height="164" viewBox="0 0 156 164" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M78.0004 2.83337L98.7936 18.0017L124.535 17.9542L132.439 42.4484L153.292 57.5375L145.292 82L153.292 106.463L132.439 121.552L124.535 146.046L98.7936 145.998L78.0004 161.167L57.2073 145.998L31.4663 146.046L23.5615 121.552L2.70898 106.463L10.7088 82L2.70898 57.5375L23.5615 42.4484L31.4663 17.9542L57.2073 18.0017L78.0004 2.83337Z" fill="#555555" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M50.292 82L70.0837 101.792L109.667 62.2084" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    </svg> */}
                    {/* <svg width="190" height="190" viewBox="0 0 190 190" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M95.0004 15.8334L115.794 31.0017L141.535 30.9542L149.439 55.4484L170.292 70.5375L162.292 95L170.292 119.463L149.439 134.552L141.535 159.046L115.794 158.998L95.0004 174.167L74.2073 158.998L48.4663 159.046L40.5615 134.552L19.709 119.463L27.7088 95L19.709 70.5375L40.5615 55.4484L48.4663 30.9542L74.2073 31.0017L95.0004 15.8334Z" fill="#555555" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M67.292 95L87.0837 114.792L126.667 75.2084" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    </svg> */}
                    <img src={check}></img>
                </div>
                <p className='text-black text-4xl text-center'>Account create with success !</p>
                <Link to="/game-page">
                    <button type="submit" className="w-full bg-black text-white py-2 rounded-full mb-2">Close</button>
                </Link>
            </div>
        </div>
    );
};

export default RegistrationSuccess;