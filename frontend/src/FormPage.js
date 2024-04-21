
//FormPage.js
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

import mongoose from 'mongoose';
function FormPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your server with user data
      const response = await axios.post('http://localhost:3001/api/users', { name, email, age });
      console.log('Server response:', response.data);
      // Reset form fields after successful submission
      setName('');
      setEmail('');
      setAge('');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default FormPage;
