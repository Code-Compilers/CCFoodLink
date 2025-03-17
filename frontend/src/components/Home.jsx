import React from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Box,
  AppBar,
  Toolbar,
  Link
} from '@mui/material';
import { 
  Fastfood, 
  Favorite, 
  People, 
  LocalShipping,
  Login,
  HowToReg
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleDashboardClick = () => {
    if (currentUser) {
      if (currentUser.roles.includes('ROLE_DONATOR')) {
        navigate('/donator');
      } else {
        navigate('/donatee');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CCFoodLink
          </Typography>
          {currentUser ? (
            <Button 
              color="inherit" 
              onClick={handleDashboardClick}
            >
              Dashboard
            </Button>
          ) : (
            <>
              <Button 
                color="inherit" 
                onClick={handleLoginClick}
                startIcon={<Login />}
                sx={{ mr: 1 }}
              >
                Login
              </Button>
              <Button 
                color="inherit" 
                variant="outlined" 
                onClick={handleRegisterClick}
                startIcon={<HowToReg />}
              >
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box className="hero-section">
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom className="hero-title">
                Connecting Food Donors with Those in Need
              </Typography>
              <Typography variant="h5" paragraph className="hero-subtitle">
                Join our community to help reduce food waste and fight hunger in your local area.
              </Typography>
              <Box mt={4}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large" 
                  onClick={handleRegisterClick}
                  className="cta-button"
                >
                  Get Started
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  size="large" 
                  onClick={handleLoginClick}
                  sx={{ ml: 2 }}
                >
                  Sign In
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <img 
                src="/images/food-donation.jpg" 
                alt="Food Donation" 
                className="hero-image"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box className="section how-it-works">
        <Container>
          <Typography variant="h3" component="h2" align="center" gutterBottom className="section-title">
            How It Works
          </Typography>
          <Grid container spacing={4} mt={2}>
            <Grid item xs={12} md={4}>
              <Card className="how-card">
                <CardContent>
                  <Fastfood className="icon" />
                  <Typography variant="h5" component="h3" gutterBottom>
                    Donate Food
                  </Typography>
                  <Typography variant="body1">
                    Register as a donator and list the food items you want to donate. Help reduce food waste and support your community.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="how-card">
                <CardContent>
                  <LocalShipping className="icon" />
                  <Typography variant="h5" component="h3" gutterBottom>
                    Connect & Deliver
                  </Typography>
                  <Typography variant="body1">
                    Our platform connects donors with recipients. Arrange for pickup or delivery of food items based on your preferences.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="how-card">
                <CardContent>
                  <Favorite className="icon" />
                  <Typography variant="h5" component="h3" gutterBottom>
                    Receive Food
                  </Typography>
                  <Typography variant="body1">
                    Register as a recipient to browse available donations or request specific items you need for yourself or your family.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Impact Section */}
      <Box className="section impact-section">
        <Container>
          <Typography variant="h3" component="h2" align="center" gutterBottom className="section-title">
            Our Impact
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <img 
                src="/images/community-impact.jpg" 
                alt="Community Impact" 
                className="impact-image"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="impact-stats">
                <Typography variant="h4" gutterBottom>
                  Together we can make a difference
                </Typography>
                <Typography variant="body1" paragraph>
                  CCFoodLink is committed to reducing food waste and addressing food insecurity in our communities. By connecting donors with those in need, we create a more sustainable and caring society.
                </Typography>
                <Grid container spacing={3} mt={2}>
                <Grid item xs={6}>
                    <Typography variant="h3" className="stat-number">500+</Typography>
                    <Typography variant="body1">Successful Donations</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h3" className="stat-number">200+</Typography>
                    <Typography variant="body1">Families Helped</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h3" className="stat-number">1000+</Typography>
                    <Typography variant="body1">Kg Food Saved</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h3" className="stat-number">50+</Typography>
                    <Typography variant="body1">Active Donors</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box className="section testimonials-section">
        <Container>
          <Typography variant="h3" component="h2" align="center" gutterBottom className="section-title">
            Testimonials
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card className="testimonial-card">
                <CardContent>
                  <Typography variant="body1" paragraph className="testimonial-text">
                    "CCFoodLink has been a blessing for our family. During tough times, we've received fresh food that would have otherwise gone to waste. The platform is easy to use and the donors are so kind."
                  </Typography>
                  <Box className="testimonial-author">
                    <Typography variant="subtitle1" fontWeight="bold">Sarah Johnson</Typography>
                    <Typography variant="body2" color="textSecondary">Food Recipient</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="testimonial-card">
                <CardContent>
                  <Typography variant="body1" paragraph className="testimonial-text">
                    "As a restaurant owner, I hated seeing good food go to waste at the end of the day. CCFoodLink has given us a simple way to connect with people who can use our excess food. It's a win-win!"
                  </Typography>
                  <Box className="testimonial-author">
                    <Typography variant="subtitle1" fontWeight="bold">Michael Chen</Typography>
                    <Typography variant="body2" color="textSecondary">Restaurant Owner</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="testimonial-card">
                <CardContent>
                  <Typography variant="body1" paragraph className="testimonial-text">
                    "I've been donating through CCFoodLink for six months now. The platform makes it so easy to list items and connect with recipients. It feels great knowing I'm helping my community."
                  </Typography>
                  <Box className="testimonial-author">
                    <Typography variant="subtitle1" fontWeight="bold">Lisa Rodriguez</Typography>
                    <Typography variant="body2" color="textSecondary">Regular Donor</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box className="section cta-section">
        <Container>
          <Card className="cta-card">
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom>
                Ready to Make a Difference?
              </Typography>
              <Typography variant="body1" align="center" paragraph>
                Join our community today and be part of the solution to food waste and hunger.
              </Typography>
              <Box display="flex" justifyContent="center" mt={3}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large" 
                  onClick={handleRegisterClick}
                  className="cta-button"
                >
                  Sign Up Now
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Footer */}
      <Box className="footer">
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                CCFoodLink
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Connecting food donors with those in need since 2023. Our mission is to reduce food waste and fight hunger in our communities.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Link href="/" color="inherit" display="block" gutterBottom>Home</Link>
              <Link href="/about" color="inherit" display="block" gutterBottom>About Us</Link>
              <Link href="/faq" color="inherit" display="block" gutterBottom>FAQ</Link>
              <Link href="/contact" color="inherit" display="block" gutterBottom>Contact</Link>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Email: info@ccfoodlink.org
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Phone: (123) 456-7890
              </Typography>
            </Grid>
          </Grid>
          <Box mt={4} pt={2} borderTop={1} borderColor="divider">
            <Typography variant="body2" color="textSecondary" align="center">
              © {new Date().getFullYear()} CCFoodLink. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Home;

