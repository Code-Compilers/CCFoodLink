import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      // Redirect to login or another page
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>Register</Typography>
      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleRegister} sx={{ mt: 2 }}>
        Register
      </Button>
    </Container>
  );
};

export default RegisterForm;