import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { axiosInstance } from '../../services/axiosInterceptor';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '400px',
    margin: 'auto',
    marginTop: '16vh',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
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
    padding: '15px',
    borderRadius: '5px',
  },
}));

const UserRegistrationPage = ({ onLogin }) => {
  const classes = useStyles();
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: ''
  });
  const [repeatPasswordValue, setRepeatPasswordValue] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [notValidPassword, setNotValidPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSave = async () => {
    try {
      const response = await axiosInstance.post('/register/', userData);
      if (response.status === 201) {
        setSuccessMessage('Profile updated successfully');
        setErrorMessage('');
        handleAuthorization(userData)

      } else {
        setErrorMessage('Failed to update profile');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to update profile');
      setSuccessMessage('');
    }
  };

  const handleAuthorization = async (userData) => {
    // Getting authorization token
    const username = userData.username
    const password = userData.password
    const response = await axiosInstance.post('api-token-auth/', { username, password });
    if (response.status === 200) {
      const data = response.data;
      Cookies.set('token', data.token, { expires: 1 }); // Token expires in 1 day
      console.log('Login successful');
      
      onLogin(data);
      window.location.href = "/events";
    } else {
      // Login failed
      console.error('Login failed');
    }
  }

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setUserData(prevState => ({ ...prevState, password: value }));
    setNotValidPassword(!validatePassword(value));
    setPasswordsMatch(repeatPasswordValue === value);
  };

  const handleRepeatPasswordChange = (e) => {
    const { value } = e.target;
    setRepeatPasswordValue(value);
    setPasswordsMatch(userData.password === value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  };

  const validatePassword = (password) => {
    // Implement password validation logic here
    const similarToPersonalInfo = (
      userData.username.toLowerCase().includes(password.toLowerCase()) ||
      userData.email.toLowerCase().includes(password.toLowerCase())
    );
    const hasMinimumLength = password.length >= 8;
    const notCommonPassword = !commonPasswords.includes(password.toLowerCase());
    const notEntirelyNumeric = isNaN(password);

    return !similarToPersonalInfo && hasMinimumLength && notCommonPassword && notEntirelyNumeric;
  };

  // Commonly used passwords for reference
  const commonPasswords = [
    // List of commonly used passwords
  ];

  const isFormValid = userData.username && userData.email && userData.password && repeatPasswordValue && passwordsMatch && !notValidPassword;


  if (Cookies.get('token') !== undefined) {
    return <Navigate to="/events" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.container}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="email"
            label="Email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            error={notValidPassword}
            helperText={notValidPassword && (
              <>
                Password does not meet requirements:<br />
                - Your password can’t be similar to personal information.<br />
                - Your password must contain at least 8 characters.<br />
                - Your password can’t be a commonly used password.<br />
                - Your password can’t be entirely numeric.
              </>
            )}
            value={userData.password}
            onChange={handlePasswordChange}
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="repeatPassword"
            label="Repeat Password"
            type="password"
            error={!passwordsMatch}
            helperText={!passwordsMatch && "Passwords do not match"}
            onChange={handleRepeatPasswordChange}
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSave}
            disabled={!isFormValid}
          >
            Register
          </Button>
        </form>
        {successMessage && <Typography sx={{ paddingTop: 2, }} color="primary">{successMessage}</Typography>}
        {errorMessage && <Typography sx={{ paddingTop: 2, }} color="error">{errorMessage}</Typography>}
      </div>
    </Container>
  );
};

export default UserRegistrationPage;
