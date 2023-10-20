import React from 'react';
import Header from '../components/Header';

const LogOut = () => {
    return (
        <div>
            <Header></Header>
            <div className="bg-white py-20 px-40 rounded-lg shadow-md w-1/2 mx-auto mt-16 flex flex-col justify-center gap-10">
                <div className='flex justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="210" height="203" viewBox="0 0 210 203" fill="none">
                        <path d="M193.235 101.5H81.4706M169.706 137.688L205 101.5L169.706 65.3125M110.882 41.1875V29.125C110.882 22.7267 108.403 16.5904 103.991 12.066C99.5781 7.54173 93.5933 5 87.3529 5H28.5294C22.289 5 16.3042 7.54173 11.8916 12.066C7.47898 16.5904 5 22.7267 5 29.125V173.875C5 180.273 7.47898 186.41 11.8916 190.934C16.3042 195.458 22.289 198 28.5294 198H87.3529C93.5933 198 99.5781 195.458 103.991 190.934C108.403 186.41 110.882 180.273 110.882 173.875V161.812" stroke="#1B1B1B" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>

                <p className='text-black text-4xl text-center'>Do you really want to log out ?</p>
                <div className='flex flex-row  gap-4'>
                    <button type="submit" className="w-full bg-black text-white py-2 rounded-full mb-2">Yes</button>
                    <button type="submit" className="w-full bg-black text-white py-2 rounded-full mb-2">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default LogOut;