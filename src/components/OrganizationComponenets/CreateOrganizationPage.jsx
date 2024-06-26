import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import axiosInstance from '../../utils/axiosInstance';
import { USERS_LIST_URL, CREATE_ORGANIZATION } from '../../utils/globalConfig';
import { toast } from 'react-hot-toast'; // Assuming you use react-hot-toast for toasts

const CreateOrganizationPage = () => {
  const [title, setTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(USERS_LIST_URL);
        const fetchedUsers = response.data;

        if (searchTerm) {
          const filteredUsers = fetchedUsers.filter(user =>
            user.userName.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setUsers([...filteredUsers, ...fetchedUsers.filter(user => !user.userName.toLowerCase().includes(searchTerm.toLowerCase()))]);
        } else {
          setUsers(fetchedUsers);
        }
      } catch (error) {
        toast.error('An Error occurred. Please contact admin.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [searchTerm, selectedUsers]);

  const handleSelectUser = (user) => {
    if (!selectedUsers.find(u => u.id === user.id)) {
      setSelectedUsers((prevSelected) => [...prevSelected, user]);
    }
  };

  const handleCreateOrganization = async () => {
    const organizationData = { title, users: selectedUsers };
    console.log(organizationData);
    try {
      setLoading(true);
      const response = await axiosInstance.post(CREATE_ORGANIZATION, organizationData);
      setLoading(false);
      setSelectedUsers([]);
      setTitle('');
      toast.success('Organization created successfully');
    } catch (error) {
      setLoading(false);
      //console.error(error);
      toast.error('An Error occurred. Please contact admin.');
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Create Organization</Typography>
      <TextField
        label="Organization Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ marginBottom: '20px' }}
      />

      {loading ? <CircularProgress /> : (
        <List>
          {selectedUsers.map((user) => (
            <ListItem key={user.id}>
              <ListItemText primary={user.userName} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleSelectUser(user)}>
                  <CheckIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}

      <Box sx={{ marginTop: '10px', marginBottom: '20px', textAlign: 'center' }}>
        <Button variant="contained" color="success" onClick={handleCreateOrganization}>
          Create
        </Button>
      </Box>

      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: '20px' }}
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          )
        }}
      />
      {loading ? <CircularProgress /> : (
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              <ListItemText primary={user.userName} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleSelectUser(user)}>
                  <CheckIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
      
    </Box>
  );
};

export default CreateOrganizationPage;
