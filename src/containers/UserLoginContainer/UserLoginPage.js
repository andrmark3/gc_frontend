import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import { axiosInstance } from '../../services/axiosInterceptor';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '400px',
    margin: '40% auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  logo: {
    maxWidth: '300px',
    marginBottom: '20px',
  },
  form: {
    width: '100%',
    marginTop: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '15px'
  },
  submit: {
    margin: '24px 0 16px',
    padding: '50px',
    borderRadius: '5px',
  },
}));

const LoginPage = ({ onLogin }) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('api-token-auth/', { username, password });

      if (response.status === 200) {
        const data = response.data;
        Cookies.set('token', data.token, { expires: 1 }); // Token expires in 1 day
        console.log('Login successful');

        onLogin(data);
        window.location.href = "/events";
      } else {
        // Login failed
        setWrongCredentials(true)
        console.error('Login failed');
      }
    } catch (error) {
      setWrongCredentials(true)
      console.error('Error:', error);
    }
  };

  if (Cookies.get('token') !== undefined) {
    return <Navigate to="/events" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.container}>
        <img src="GC_Logo.png" alt="Logo" className={classes.logo} />
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign In
          </Button>
          {wrongCredentials && <Typography align="center" sx={{ paddingBottom: 3}} color="error">{'Wrong credentials provided.'}</Typography>}
          <div className="signup-container">
            <Typography variant="body2" align="center">
              Don't have an account? <Link href="/signup">Sign up</Link>
            </Typography>
          </div>
          <div className="forgot-password-container">
            <Typography variant="body2" align="center">
              <Link href="/forgot-password">Forgot your password?</Link>
            </Typography>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
