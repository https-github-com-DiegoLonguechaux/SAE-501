import React, { useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Envoyer une requête POST à votre API Symfony
      const response = await fetch('https://mmi21-02.mmi-limoges.fr/authentication_token', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Vérifier si la requête a réussi (statut 2xx)
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userToken', token);
        // Rediriger l'utilisateur ou faire d'autres actions après une connexion réussie
        window.location.href = '/';
      } else {
        // Gérer les erreurs si la requête échoue
        const data = await response.json();
        console.log('API response:', data);
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div>
    <Header></Header>
    <div className="bg-white p-8 rounded-lg shadow-2xl w-1/4 mx-auto mt-16">
      <h2 className="text-2xl font-semibold mb-4 text-center">Connexion</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
          <input type="email" id="email" className="w-full p-2 border rounded" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600 font-medium">Password</label>
          <input type="password" id="password" className="w-full p-2 border rounded" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-yellow-500 hover:text-black mb-2">Log In</button>
      </form>
      <p className="text-gray-600 text-center my-4">
        New member?{' '}
        <Link to="/signup-form" className="text-yellow-500">
          Create an account
        </Link>
      </p>
    </div>
  </div>
  );
};

export default LoginForm;
