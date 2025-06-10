import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useAppDispatch } from '../app/hooks';
import { login } from '../features/auth/authSlice';

const Login = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login());
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: 300,
        m: 'auto',
        mt: 8,
      }}
    >
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button variant="contained" type="submit">
        Login
      </Button>
    </Box>
  );
};

export default Login;
