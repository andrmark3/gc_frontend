import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { axiosInstance } from '../../services/axiosInterceptor';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '400px',
    margin: 'auto',
    marginTop: '16vh', // Adjust as needed to center vertically
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    justifyContent: 'center', // Center horizontally and vertically
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

const ProfilePage = () => {
  const classes = useStyles();
  const [passwordValue, setPasswordValue] = useState('');
  const [repeatPasswordValue, setRepeatPasswordValue] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [notValidePassword, setNotValidatePassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [sessionData, setSessionData] = useState(sessionStorage.getItem('userData'));

  useEffect(() => {
    const initializeUserData = async () => {
      if (sessionData) {
        let userData = JSON.parse(sessionData);
        delete userData.token;
        if (!userData.hasOwnProperty('password')) {
          userData.password = ''; // Add password field with empty string value if it doesn't exist
        }
        setSessionData(JSON.stringify(userData));
      }
    };
  
    initializeUserData();
  }, []);
  
  const [userData, setUserData] = useState(sessionData ? JSON.parse(sessionData) : {
    username: '',
    password: '',
    email: ''
  });


  const handleSave = async () => {
    try {
      const response = await axiosInstance.put('/user_update/', userData);
      if (response.status === 200) {
        sessionStorage.removeItem('userData')
        sessionStorage.setItem('userData', JSON.stringify(userData))
        setSuccessMessage('Profile updated successfully');
        setErrorMessage('');
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

  const validatePassword = (password) => {
    // Check if password is too similar to other personal information
    const similarToPersonalInfo = userData.username?.toLowerCase().includes(password.toLowerCase()) ||
      userData.email?.toLowerCase().includes(password.toLowerCase()) ||
      userData.phoneNumber?.includes(password);

    // Check if password contains at least 8 characters
    const hasMinimumLength = password.length >= 8;

    // Check if password is not entirely numeric
    const notEntirelyNumeric = isNaN(password);

    if (!similarToPersonalInfo && hasMinimumLength && notEntirelyNumeric) {
      setNotValidatePassword(false)
    } else {
      setNotValidatePassword(true)
    }
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setSuccessMessage('');
    setPasswordValue(value);
    validatePassword(passwordValue)
    setPasswordsMatch(repeatPasswordValue === value)
    if (value === '') {
      setNotValidatePassword(false)
    }
    handleChange(e)
  };

  const handleRepeatPasswordChange = (e) => {
    const { value } = e.target;
    setRepeatPasswordValue(value);
    setPasswordsMatch(passwordValue === value)
    if (value == null && passwordValue == null) {
      setErrorMessage('');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  if (Cookies.get('token') === undefined) {
    return <Navigate to="/login" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.container}>
        <Typography component="h1" variant="h5">
          Profile
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
            disabled
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="email"
            label="Email"
            type="email"
            value={userData.email}
            c
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            error={notValidePassword}
            helperText={notValidePassword && (
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
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="repeatPassword"
            label="Repeat Password"
            type="password"
            error={!passwordsMatch && repeatPasswordValue !== ''}
            helperText={!passwordsMatch && "Passwords do not match"}
            onChange={handleRepeatPasswordChange}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSave}
            disabled={!passwordsMatch}
          >
            Save
          </Button>
        </form>
        {successMessage && <Typography sx={{ paddingTop: 2, }} color="primary">{successMessage}</Typography>}
        {errorMessage && <Typography sx={{ paddingTop: 2, }} color="error">{errorMessage}</Typography>}
      </div>
    </Container>
  );
};

export default ProfilePage
