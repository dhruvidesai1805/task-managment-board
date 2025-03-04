import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Box,
    Typography
} from '@mui/material';
const Signup = () => {
    const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.password) {
            newErrors.password = 'Password is required';
          } else {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
            
            if (!passwordRegex.test(formData.password)) {
              newErrors.password = 'Password must be at least 6 characters, include upper & lower case, a number, and a special character';
            }
          }
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Password and Confirm Password do not match';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSignup = (e) => {
        e.preventDefault();
        if (validateForm()) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const { username, password } = formData;
        if (users.some(user => user.username === username)) {
            alert("Username already exists!");
            return;
          }
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        navigate('/login');
        }
    };
      

    return (
        <Container maxWidth="xs">
            <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
                <Typography variant="h5">Signup</Typography>
                <form onSubmit={handleSignup} className='mt-5 w-full'>
                    <Box className="my-3">
                        <TextField label="Username"
                            fullWidth
                            name='username'
                            value={formData.username}
                            onChange={handleChange}
                            error={!!errors.username}
                            helperText={errors.username}
                        />
                    </Box>
                    <Box className="my-3">
                        <TextField label="Password"
                            type="password"
                            name="password"
                            fullWidth
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                    </Box>
                    <Box className="my-3">
                        <TextField label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            fullWidth
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                        />
                    </Box>

                    <Button type="submit" variant="contained" color="success" fullWidth>Signup</Button>
                    <Typography variant="body2" mt={2} align="center">
                        Already have an account? <Button onClick={() => navigate('/login')}>Login</Button>
                    </Typography>
                </form>
            </Box>
        </Container>
    );
};

export default Signup;