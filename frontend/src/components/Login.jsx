import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Box, 
  Grid, 
  Link, 
  Alert 
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import AuthService from "../services/auth.service";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      if (currentUser.roles.includes("ROLE_DONATOR")) {
        navigate("/donator");
      } else {
        navigate("/donatee");
      }
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    
    setMessage("");
    setLoading(true);

    if (!email || !password) {
      setMessage("All fields are required!");
      setLoading(false);
      return;
    }

    AuthService.login(email, password).then(
      (response) => {
        if (response.roles.includes("ROLE_DONATOR")) {
          navigate("/donator");
        } else {
          navigate("/donatee");
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          mb: 3
        }}>
          <LockOutlined sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography component="h1" variant="h5">
            Sign in to CCFoodLink
          </Typography>
        </Box>

        {message && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
