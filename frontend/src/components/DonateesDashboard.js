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

const DonateesDashboard = () => {
  const [profile, setProfile] = useState({});
  const [donations, setDonations] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [requestForm, setRequestForm] = useState({
    itemName: '',
    quantity: '',
    urgency: '',
    description: ''
  });

  useEffect(() => {
    fetchDonateeProfile();
    fetchDonations();
  }, []);

  const fetchDonateeProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/donatee/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchDonations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/donatee/donations', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setDonations(response.data);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  const handleRequestSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/donatee/request', requestForm, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setOpenForm(false);
      setRequestForm({ itemName: '', quantity: '', urgency: '', description: '' });
      fetchDonations();
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>Donatee Dashboard</Typography>
      
      {/* Profile Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">Profile Information</Typography>
          <Typography>Name: {profile.name}</Typography>
          <Typography>Email: {profile.email}</Typography>
          <Typography>Address: {profile.address}</Typography>
        </CardContent>
      </Card>

      {/* Request Donation Button */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setOpenForm(true)}
        sx={{ mb: 4 }}
      >
        Request Donation
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

      {/* Request Form Dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>Request Donation</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Item Name"
            value={requestForm.itemName}
            onChange={(e) => setRequestForm({...requestForm, itemName: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Quantity"
            value={requestForm.quantity}
            onChange={(e) => setRequestForm({...requestForm, quantity: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Urgency Level"
            value={requestForm.urgency}
            onChange={(e) => setRequestForm({...requestForm, urgency: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            value={requestForm.description}
            onChange={(e) => setRequestForm({...requestForm, description: e.target.value})}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button onClick={handleRequestSubmit} variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DonateesDashboard;
