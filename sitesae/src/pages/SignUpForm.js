import React, { useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  // const [formData, setFormData] = useState({
  //   username: '',
  //   firstname: '',
  //   lastname: '',
  //   email: '',
  //   password: '', 
  //   // confirmPassword: '', 
  // });

  const [email, setEmail] = useState('');
  const [plainPassword, setPlainPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://mmi21-02.mmi-limoges.fr/api/users', {
        method: 'POST',
        headers: {
          'accept': 'application/ld+json',
          'Content-Type': 'application/ld+json'
        },
        body: JSON.stringify({
          email,
          plainPassword,
          // confirmPassword,
        }),
      });

      // Vérifier si la requête a réussi
      if (response.ok) {
        const data = await response.json();
        // Traiter la réponse de l'API (par exemple, rediriger l'utilisateur)
        console.log(data);
      } else {
        // Gérer les erreurs si la requête échoue
        console.error('Server error: ', response.statusText);
      }
    } catch (error) {
       console.error('Error: ', error);
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  //   console.log(formData);
  // };

  return (
    <div className='min-h-screen'>
      <Header></Header>
      <div className="bg-white p-8 rounded shadow-md w-1/4 mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-4 text-center">Create an account</h2>
        <form onClick={handleSubmit}>
          {/* <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 font-medium">Username</label>
            <input
              type="text"
              id="username"
              name="username" // Ajoutez l'attribut name
              className="w-full p-2 border rounded"
              onChange={handleChange} // Ajoutez le gestionnaire onChange
            />
          </div> */}
          {/* <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-600 font-medium">Firstname</label>
            <input
              type="text"
              id="firstName"
              name="firstname" // Ajoutez l'attribut name
              className="w-full p-2 border rounded"
              onChange={handleChange} // Ajoutez le gestionnaire onChange
            />
          </div> */}
          {/* <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-600 font-medium">Lastname</label>
            <input
              type="text"
              id="lastName"
              name="lastname" // Ajoutez l'attribut name
              className="w-full p-2 border rounded"
              onChange={handleChange} // Ajoutez le gestionnaire onChange
            /> 
          </div> */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border rounded"
              value={plainPassword}
              onChange={(e) => setPlainPassword(e.target.value)}
              required
            />
          </div>
          {/* <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 font-medium">Confirm Password</label>
            <input 
              type="password"
              className="w-full p-2 border rounded"
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div> */}
          <Link to="/registration-success">
            <button type="submit"  className="w-full bg-black text-white py-2 rounded hover:bg-yellow-500 hover:text-black mb-2">Register</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
