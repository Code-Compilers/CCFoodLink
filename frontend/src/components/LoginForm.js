import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      // Redirect to dashboard or another page
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>Login</Typography>
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
      <Button variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2 }}>
        Login
      </Button>
    </Container>
  );
};

export default LoginForm;