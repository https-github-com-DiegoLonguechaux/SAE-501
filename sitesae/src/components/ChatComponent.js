import React, { useState, useRef } from 'react';

const ChatComponent = () => {
    const [skateChat, setSkateChat] = useState([
        { user: 'Tony Hawk', message: 'Salut les gars, qui est partant pour une session de skate cet après-midi ?' },
        { user: 'Skater123', message: 'Je suis partant ! Où veux-tu rouler ?' },
        { user: 'SkateGirl', message: 'Je préférerais le skatepark du centre-ville. Ça vous va ?' },
        { user: 'Tony Hawk', message: 'Ça me va ! On se retrouve à 15h au skatepark ?' },
        { user: 'Skater123', message: "15h, c'est bon pour moi !" },
        { user: 'SkateGirl', message: 'Ok, à cet après-midi !' },
    ]);

    const [newMessage, setNewMessage] = useState('');

    const inputRef = useRef(null); // Créez une référence à l'élément d'entrée

    const handleSendMessage = () => {
        if (newMessage.trim() === '') {
            return;
        }

        const updatedChat = [...skateChat, { user: 'Vous', message: newMessage }];
        setSkateChat(updatedChat);
        setNewMessage('');
    };

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage(); // Appel à la fonction handleSendMessage si la touche "Entrée" est pressée
        }
    };

    return (
        <div className='mr-16'>
            <div style={{ height: '200px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }} className='scrollbar-custom scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-600 scrollbar-track-gray-200'>
                {skateChat.map((entry, index) => (
                    <div key={index}>
                        <strong>{entry.user}:</strong> {entry.message}
                    </div>
                ))}
            </div>
            <div className='flex justify-between mt-2'>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyUp={handleEnterKey} // Gestion de la touche "Entrée"
                    placeholder="Message"
                    ref={inputRef} // Assignez la référence à l'élément d'entrée
                    className='rounded-full p-2'
                />
                <button onClick={handleSendMessage} className='bg-black text-white px-6 rounded-full'>Send</button>
            </div>
        </div>
    );
};

export default ChatComponent;
