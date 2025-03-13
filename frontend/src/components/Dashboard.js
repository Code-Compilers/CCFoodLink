import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Card,
  CardContent,
  Grid,
} from '@mui/material';

const Dashboard = () => {
  const [profile, setProfile] = useState({});
  const [donations, setDonations] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [donationForm, setDonationForm] = useState({
    itemName: '',
    quantity: '',
    expiryDate: '',
    description: ''
  });

  useEffect(() => {
    fetchDonorProfile();
    fetchDonations();
  }, []);

  const fetchDonorProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/donor/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchDonations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/donor/donations', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setDonations(response.data);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  const handleDonationSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/donor/donate', donationForm, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setOpenForm(false);
      setDonationForm({ itemName: '', quantity: '', expiryDate: '', description: '' });
      fetchDonations();
    } catch (error) {
      console.error('Error submitting donation:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>Donor Dashboard</Typography>
      
      {/* Profile Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">Profile Information</Typography>
          <Typography>Name: {profile.name}</Typography>
          <Typography>Email: {profile.email}</Typography>
          <Typography>Address: {profile.address}</Typography>
        </CardContent>
      </Card>

      {/* Make Donation Button */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setOpenForm(true)}
        sx={{ mb: 4 }}
      >
        Make Donation
      </Button>

      {/* Donations History */}
      <Typography variant="h6" sx={{ mb: 2 }}>Donation History</Typography>
      <Grid container spacing={3}>
        {donations.map((donation) => (
          <Grid item xs={12} md={6} key={donation.id}>
            <Card>
              <CardContent>
                <Typography>Item: {donation.itemName}</Typography>
                <Typography>Quantity: {donation.quantity}</Typography>
                <Typography>Status: {donation.status}</Typography>
                <Typography>Date: {new Date(donation.createdAt).toLocaleDateString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Donation Form Dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>Make a Donation</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Item Name"
            value={donationForm.itemName}
            onChange={(e) => setDonationForm({...donationForm, itemName: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Quantity"
            value={donationForm.quantity}
            onChange={(e) => setDonationForm({...donationForm, quantity: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            type="date"
            label="Expiry Date"
            value={donationForm.expiryDate}
            onChange={(e) => setDonationForm({...donationForm, expiryDate: e.target.value})}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            value={donationForm.description}
            onChange={(e) => setDonationForm({...donationForm, description: e.target.value})}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button onClick={handleDonationSubmit} variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export { Dashboard as default };
