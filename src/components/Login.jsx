import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Box,
    Typography
} from '@mui/material';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!username) newErrors.username = 'Username is required';
        if (!password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if(validateForm()){
            let users = JSON.parse(localStorage.getItem('users')) || [];
            let validUser = users.find(user => user.username === username && user.password === password);
            
            if (validUser) {
              localStorage.setItem('loggedInUser', username);
              setTimeout(() => {
                navigate('/tasks');
              }, 100);
            } else {
              alert("Invalid credentials");
            }
        }
    };
      
    return (
        <Container maxWidth="xs">
            <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
                <Typography variant="h5">Login</Typography>
                <form onSubmit={handleLogin} className='mt-5 w-full'>
                    <Box className="my-3">
                        <TextField label="Username"
                            fullWidth
                            value={username}
                            onChange={(e) => {setUsername(e.target.value);setErrors({...errors, username:''})}}
                            error={!!errors.username}
                            helperText={errors.username}
                        />
                    </Box>

                    <Box className="my-3">
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) =>{ setPassword(e.target.value);setErrors({...errors, password:''})}}
                            error={!!errors.password}
                            helperText={errors.password} />
                    </Box>
                    <Button type="submit" variant="contained" color="success" fullWidth className='mt-5'>Login</Button>
                    <Typography variant="body2" mt={2} align="center">
                        No account? <Button onClick={() => navigate('/signup')}>Signup</Button>
                    </Typography>
                </form>
            </Box>
        </Container>
    );
};

export default Login;