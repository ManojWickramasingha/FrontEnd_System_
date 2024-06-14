import React, { useState } from 'react';
import { Container, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Switch, Typography, Snackbar, Alert, Card, CardContent, CardHeader, Box, Tooltip, CircularProgress } from '@mui/material';
import { Info as InfoIcon, Save as SaveIcon } from '@mui/icons-material';

const Settings = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    currency: 'USD',
    notifications: false,
    language: 'en',
    theme: 'light',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    // Simulate a loading state
    setLoading(true);

    // Reset error and show success message after a delay
    setTimeout(() => {
      setError('');
      setOpenSnackbar(true);
      setLoading(false);
      console.log('Form Data:', formData);
    }, 2000);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <form onSubmit={handleSubmit}>
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardHeader title="User Information" />
          <CardContent>
            <TextField
              label="Username"
              name="username"
              fullWidth
              margin="normal"
              value={formData.username}
              onChange={handleChange}
              error={!!error && !formData.username}
              helperText={!!error && !formData.username ? 'Username is required' : ''}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              error={!!error && !formData.email}
              helperText={!!error && !formData.email ? 'Email is required' : ''}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              error={!!error && !formData.password}
              helperText={!!error && !formData.password ? 'Password is required' : ''}
            />
          </CardContent>
        </Card>
        
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardHeader title="Preferences" />
          <CardContent>
            <FormControl fullWidth margin="normal">
              <InputLabel>Currency</InputLabel>
              <Select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Language</InputLabel>
              <Select
                name="language"
                value={formData.language}
                onChange={handleChange}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Spanish</MenuItem>
                <MenuItem value="fr">French</MenuItem>
                <MenuItem value="de">German</MenuItem>
                <MenuItem value="zh">Chinese</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Theme</InputLabel>
              <Select
                name="theme"
                value={formData.theme}
                onChange={handleChange}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
              </Select>
            </FormControl>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.notifications}
                    onChange={handleChange}
                    name="notifications"
                    color="primary"
                  />
                }
                label={
                  <Tooltip title="Enable or disable notifications" arrow>
                    <span>Enable Notifications <InfoIcon fontSize="small" /></span>
                  </Tooltip>
                }
              />
            </FormGroup>
          </CardContent>
        </Card>

        {error && (
          <Typography variant="body2" color="error" gutterBottom>
            {error}
          </Typography>
        )}

        <Box mt={2} display="flex" justifyContent="flex-end" alignItems="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={loading ? <CircularProgress size={24} /> : <SaveIcon />}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Settings'}
          </Button>
        </Box>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Settings;
