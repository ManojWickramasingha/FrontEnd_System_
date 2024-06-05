// src/Settings.js
import React, { useState } from 'react';
import { Container, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Switch } from '@mui/material';

const Settings = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    currency: 'USD',
    notifications: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <Container maxWidth="sm">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />
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
            label="Enable Notifications"
          />
        </FormGroup>
        <Button type="submit" variant="contained" color="primary">
          Save Settings
        </Button>
      </form>
    </Container>
  );
};

export default Settings;
