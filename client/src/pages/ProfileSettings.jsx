import React, {useState, useEffect} from "react";
import {Container, TextField, Button, Typography, Box, Alert} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../store/actions/authActions';

function ProfileSettings() {
    const dispatch = useDispatch();

    //Accessing the user state
    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);


    const [formData, setFormData] = useState({username: '', email: ''});

    useEffect(() => {
        if(!user) {
            dispatch(getUserProfile()); //Fetching user profile if not already in state
        } else {
            setFormData({ username: user.username, email: user.email});
        }
    }, [dispatch, user]);

    const handleChange = (e) => {
        setFormData({ ...FormData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserProfile(formData));
    };

    if(loading) {
        return (
            <Container sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h6">Loading...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{mt: 8}}>
                <Typography variant="h4" gutterBottom>
                    Profile Settings
                </Typography>
                {error && <Alert severity="error">{error.msg || 'Error updating profile'}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label= "Username"
                        name= "username"
                        value={formData.username}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.value}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        disabled
                    />
                    {/* Add fields for password change if necessary */}
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{mt: 2}}>
                        Save Changes
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default ProfileSettings;