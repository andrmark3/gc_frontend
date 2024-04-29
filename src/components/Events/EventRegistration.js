import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CloseIcon from '@material-ui/icons/Close';
import { axiosInstance } from '../../services/axiosInterceptor';

const ModalBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  outline: 'none',
  width: '600px',
  height: '400px',
  [theme.breakpoints.down('md')]: {
    width: '90%',
    height: 'auto',
    maxHeight: '400px',
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

const StyledTextField = styled(TextField)({
  marginBottom: '1rem',
});

export default function EventRegisterModal({ open, onClose, eventId }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const eventData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phoneNumber,
        email: formData.email,
        event_id: eventId, // Replace 'eventId' with the actual ID of the event
      };
  
      const response = await axiosInstance.post('/api/participants/', eventData);
      
      if (response.status === 201) {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
        });
  
        onClose();
      } else {
        // Handle other status codes as errors
        throw new Error('Failed to register');
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error, show error message to the user, etc.
    }
  };


  return (
    <Modal open={open} onClose={onClose}>
      <ModalBox>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
        <Typography variant="h6" component="h2">
          Registration Form
        </Typography>
        <Box sx={{ mt: 2 }}>
          <StyledTextField
            name="firstName"
            label="First Name"
            variant="outlined"
            fullWidth
            value={formData.firstName}
            onChange={handleChange}
          />
          <StyledTextField
            name="lastName"
            label="Last Name"
            variant="outlined"
            fullWidth
            value={formData.lastName}
            onChange={handleChange}
          />
          <StyledTextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />
          <StyledTextField
            name="phoneNumber"
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Register
          </Button>
        </Box>
      </ModalBox>
    </Modal>
  );
}

