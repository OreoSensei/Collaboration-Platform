import React, {useState, useEffect} from 'react';
import {Container, TextField, Button, Typography, Box, Alert} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/actions/authActions';

function Register() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: ''});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Accessing the authentication state and error messages
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const authError = useSelector((state) => state.auth.error);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return;
        }
        dispatch(register(formData));
    };

    return(
        <Container maxWidth="sm">
            <Box sx={{mt: 8}}>
                <Typography variant='h4' gutterBottom>
                    Register
                </Typography>
                {authError && <Alert severity='error'>{authError.msg || 'Registration Failed'}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                        required
                    />
                    <TextField
                        label='Email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                        required
                    />
                    <TextField
                        label='Password'
                        name='password'
                        type='password'
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                        required
                    />
                    <TextField
                        label='Confirm Password'
                        name='confirmPassword'
                        type='password'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                        required
                    />
                    <Button type='submit' variant='contained' color='primary' fullWidth sx={{mt: 2}}>
                        Register
                    </Button>

                    <Box sx={{mt: 2}}>
                        <Typography variant='body2'>
                            Already have an account? <Link to='/'>Login</Link>
                        </Typography>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}

export default Register;