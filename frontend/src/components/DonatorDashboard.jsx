import React, { useState, useEffect } from 'react';
import { 
  Container, Grid, Card, CardContent, Typography, Button, 
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Divider, Avatar, Box, Chip,
  Tab, Tabs, AppBar, Toolbar
} from '@mui/material';
import { 
  PersonOutline, History, LocalShipping, Add, 
  Logout, Dashboard as DashboardIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import './DonatorDashboard.css';

const DonatorDashboard = () => {
  const [profile, setProfile] = useState({});
  const [myDonations, setMyDonations] = useState([]);
  const [donationRequests, setDonationRequests] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  
  const [openDonateDialog, setOpenDonateDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  
  const [newDonation, setNewDonation] = useState({
    itemName: '',
    category: '',
    description: '',
    deliveryMethod: 'DELIVERY'
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    fetchMyDonations();
    fetchDonationRequests();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await UserService.getDonatorProfile();
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchMyDonations = async () => {
    try {
      const response = await UserService.getDonatorDonations();
      setMyDonations(response.data);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  const fetchDonationRequests = async () => {
    try {
      const response = await UserService.getDonationRequests();
      setDonationRequests(response.data);
    } catch (error) {
      console.error('Error fetching donation requests:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  const handleOpenDonateDialog = () => {
    setOpenDonateDialog(true);
  };

  const handleCloseDonateDialog = () => {
    setOpenDonateDialog(false);
    setNewDonation({
      itemName: '',
      category: '',
      description: '',
      deliveryMethod: 'DELIVERY'
    });
  };

  const handleDonationChange = (e) => {
    const { name, value } = e.target;
    setNewDonation({
      ...newDonation,
      [name]: value
    });
  };

  const handleSubmitDonation = async () => {
    try {
      await UserService.createDonation(newDonation);
      handleCloseDonateDialog();
      fetchMyDonations();
    } catch (error) {
      console.error('Error creating donation:', error);
    }
  };

  const handleViewDetails = (donation) => {
    setSelectedDonation(donation);
    setOpenDetailsDialog(true);
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedDonation(null);
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      await UserService.acceptRequest(requestId);
      fetchDonationRequests();
      fetchMyDonations();
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return 'info';
      case 'ACCEPTED':
        return 'success';
      case 'COMPLETED':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <DashboardIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CCFoodLink Donator Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<Logout />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container className="dashboard-container">
        {/* Profile Card */}
        <Card className="profile-card" sx={{ mb: 4 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Avatar className="profile-avatar">
                  {profile.name ? profile.name.charAt(0).toUpperCase() : 'D'}
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant="h5">{profile.name}</Typography>
                <Typography variant="body1" color="textSecondary">{profile.email}</Typography>
                {profile.address && (
                  <Typography variant="body2" color="textSecondary">{profile.address}</Typography>
                )}
              </Grid>
              <Grid item>
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<Add />}
                  onClick={handleOpenDonateDialog}
                >
                  Make Donation
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Box sx={{ width: '100%', mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            centered
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab icon={<History />} label="My Donations" />
            <Tab icon={<LocalShipping />} label="Donation Requests" />
          </Tabs>
        </Box>

        {/* My Donations Tab */}
        {tabValue === 0 && (
          <div>
            <Typography variant="h5" className="section-title" gutterBottom>
              <History className="section-icon" />
              My Donations
            </Typography>
            
            {myDonations.length === 0 ? (
              <Card>
                <CardContent className="empty-message">
                  <Typography variant="body1" align="center">
                    You haven't made any donations yet. Click "Make Donation" to get started.
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              <Grid container spacing={3}>
                {myDonations.map((donation) => (
                  <Grid item xs={12} sm={6} md={4} key={donation.id}>
                    <Card className="donation-card card-hover">
                      <CardContent>
                        <Chip 
                          label={donation.status} 
                          color={getStatusColor(donation.status)} 
                          size="small" 
                          className="status-chip"
                        />
                        <Typography variant="h6" gutterBottom>{donation.itemName}</Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          Category: {donation.category || 'Not specified'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {formatDate(donation.createdAt)}
                        </Typography>
                        <Button 
                          variant="outlined" 
                          size="small" 
                          className="view-details-button"
                          onClick={() => handleViewDetails(donation)}
                          fullWidth
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </div>
        )}

        {/* Donation Requests Tab */}
        {tabValue === 1 && (
          <div>
            <Typography variant="h5" className="section-title" gutterBottom>
              <LocalShipping className="section-icon" />
              Donation Requests
            </Typography>
            
            {donationRequests.length === 0 ? (
              <Card>
                <CardContent className="empty-message">
                  <Typography variant="body1" align="center">
                    There are no pending donation requests at the moment.
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              <Grid container spacing={3}>
                {donationRequests.map((request) => (
                  <Grid item xs={12} sm={6} md={4} key={request.id}>
                    <Card className="donation-card card-hover">
                      <CardContent>
                        <Chip 
                          label={request.urgency || 'NORMAL'} 
                          color={request.urgency === 'HIGH' ? 'error' : 'warning'} 
                          size="small" 
                          className="status-chip"
                        />
                        <Typography variant="h6" gutterBottom>{request.itemName}</Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          Quantity: {request.quantity || 'Not specified'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          Requested by: {request.donatee?.name || 'Anonymous'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {formatDate(request.createdAt)}
                        </Typography>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                          <Button 
                            variant="outlined" 
                            size="small"
                            onClick={() => handleViewDetails(request)}
                          >
                            View Details
                          </Button>
                          <Button 
                            variant="contained" 
                            color="primary" 
                            size="small"
                            onClick={() => handleAcceptRequest(request.id)}
                          >
                            Accept
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </div>
        )}

        {/* Make Donation Dialog */}
        <Dialog open={openDonateDialog} onClose={handleCloseDonateDialog} maxWidth="sm" fullWidth>
          <DialogTitle>Make a Donation</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="itemName"
              label="Item Name"
              type="text"
              fullWidth
              variant="outlined"
              value={newDonation.itemName}
              onChange={handleDonationChange}
              className="dialog-field"
              required
            />
            <TextField
              margin="dense"
              name="category"
              select
              label="Food Category"
              fullWidth
              variant="outlined"
              value={newDonation.category}
              onChange={handleDonationChange}
              className="dialog-field"
            >
              <MenuItem value="Fruits & Vegetables">Fruits & Vegetables</MenuItem>
              <MenuItem value="Grains & Cereals">Grains & Cereals</MenuItem>
              <MenuItem value="Dairy Products">Dairy Products</MenuItem>
              <MenuItem value="Meat & Poultry">Meat & Poultry</MenuItem>
              <MenuItem value="Canned Goods">Canned Goods</MenuItem>
              <MenuItem value="Beverages">Beverages</MenuItem>
              <MenuItem value="Snacks">Snacks</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              value={newDonation.description}
              onChange={handleDonationChange}
              className="dialog-field"
              multiline
              rows={4}
            />
            <TextField
              margin="dense"
              name="deliveryMethod"
              select
              label="Delivery Method"
              fullWidth
              variant="outlined"
              value={newDonation.deliveryMethod}
              onChange={handleDonationChange}
              className="dialog-field"
            >
              <MenuItem value="DELIVERY">I will deliver</MenuItem>
              <MenuItem value="PICKUP">Pickup only</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDonateDialog}>Cancel</Button>
            <Button 
              onClick={handleSubmitDonation} 
              variant="contained" 
              color="primary"
              disabled={!newDonation.itemName}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        {/* Donation Details Dialog */}
        <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {selectedDonation?.itemName || 'Donation Details'}
          </DialogTitle>
          <DialogContent>
            {selectedDonation && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Status: 
                  <Chip 
                    label={selectedDonation.status} 
                    color={getStatusColor(selectedDonation.status)} 
                    size="small" 
                    sx={{ ml: 1 }}
                  />
                </Typography>
                
                {selectedDonation.category && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Category:</strong> {selectedDonation.category}
                  </Typography>
                )}
                
                {selectedDonation.description && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Description:</strong> {selectedDonation.description}
                  </Typography>
                )}
                
                {selectedDonation.deliveryMethod && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Delivery Method:</strong> {selectedDonation.deliveryMethod === 'DELIVERY' ? 'Will deliver' : 'Pickup only'}
                  </Typography>
                )}
                
                <Divider className="details-divider" />
                
                {selectedDonation.donatee && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Recipient:</strong> {selectedDonation.donatee.name}
                  </Typography>
                )}
                
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <strong>Created:</strong> {formatDate(selectedDonation.createdAt)}
                </Typography>
                
                              {selectedDonation.updatedAt && selectedDonation.updatedAt !== selectedDonation.createdAt && (
                                <Typography variant="body2" color="textSecondary">
                                  <strong>Last Updated:</strong> {formatDate(selectedDonation.updatedAt)}
                                </Typography>
                              )}
                            </>
                          )}
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseDetailsDialog}>Close</Button>
                        </DialogActions>
                      </Dialog>
                    </Container>
                  </div>
                )
}

export default DonatorDashboard