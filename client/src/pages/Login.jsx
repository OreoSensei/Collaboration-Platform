import React, {useState, useEffect} from "react";
import {Container, TextField, Button, Typography, Box, Alert} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { login } from '../store/actions/authActions';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //To access the authentication state and errors if any
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const authError = useSelector((state) => state.auth.error);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);
    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));  //Dispatch login action
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{mt: 8}}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                {authError && <Alert severity="error">{authError.msg || 'Login Failed'}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label='Email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label='Password'
                        name="password"
                        type='password'
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{mt: 2}}>
                        Login
                    </Button>
                    <Box sx={{mt: 2}}>
                        <Typography variant="body2">
                            Don't have an account? <Link to="/register">Register</Link>
                        </Typography>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}

export default Login;