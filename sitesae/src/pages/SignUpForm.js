import React, { useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '', 
    // confirmPassword: '', 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api', formData, {
        headers: {
          'accept': 'application/ld+json',
          'Content-Type': 'application/ld+json'
        }
      });
      // Gérer la réponse ici, par exemple, rediriger l'utilisateur vers une page de succès.
      console.log('Réponse de l\'API:', response.data);
    } catch (error) {
      // Gérer les erreurs ici, par exemple, afficher un message d'erreur à l'utilisateur.
      console.error('Erreur lors de la requête API:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  return (
    <div className='min-h-screen'>
      <Header></Header>
      <div className="bg-white p-8 rounded shadow-md w-1/4 mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-4 text-center">Créer un compte</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 font-medium">Username</label>
            <input
              type="text"
              id="username"
              name="username" // Ajoutez l'attribut name
              className="w-full p-2 border rounded"
              onChange={handleChange} // Ajoutez le gestionnaire onChange
            />
          </div>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-600 font-medium">firstName</label>
            <input
              type="text"
              id="firstName"
              name="firstname" // Ajoutez l'attribut name
              className="w-full p-2 border rounded"
              onChange={handleChange} // Ajoutez le gestionnaire onChange
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-600 font-medium">lastName</label>
            <input
              type="text"
              id="lastName"
              name="lastname" // Ajoutez l'attribut name
              className="w-full p-2 border rounded"
              onChange={handleChange} // Ajoutez le gestionnaire onChange
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email" // Ajoutez l'attribut name
              className="w-full p-2 border rounded"
              onChange={handleChange} // Ajoutez le gestionnaire onChange
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password" // Ajoutez l'attribut name
              className="w-full p-2 border rounded"
              onChange={handleChange} // Ajoutez le gestionnaire onChange
            />
          </div>
          {/* <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-600 font-medium">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword" // Ajoutez l'attribut name
              className="w-full p-2 border rounded"
              onChange={handleChange} // Ajoutez le gestionnaire onChange
            />
          </div> */}
          <Link to="/registration-success">
            <button type="submit" onClick={handleSubmit} className="w-full bg-black text-white py-2 rounded hover:bg-yellow-500 hover:text-black mb-2">Créer un compte</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
