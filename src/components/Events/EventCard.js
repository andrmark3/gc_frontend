import React, { useState } from 'react';
import { red } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EventRegisterModal from './EventRegistration';



export default function EventCard({ id, title, short_description, long_description, location,
  imageUrl, launch_date, register_end_date, register_start_date }) {
  const [expanded, setExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false); // State to control modal visibility
  const [selectedEvent, setSelectedEvent] = useState(null); // Define selectedEvent state

  const todayDate = new Date().toISOString().split('T')[0];

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleRegister = () => {
    setSelectedEvent(id); // Use the event ID directly
    handleOpenModal();
  };
  const isRegistrationOpen = todayDate >= register_start_date && todayDate <= register_end_date;

  return (
    <Card sx={{ maxWidth: 1000, margin: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            GC
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={'Launch on: ' + launch_date}
      />
      <CardMedia className='CardMedia'
        component="img"
        image={imageUrl ? imageUrl : '/no_image.jpg'}
        alt="Event Image"
      />
      <CardContent>
        <Typography sx={{ paddingBottom: 1, }} variant="body2">
          Location: {location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {short_description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {isRegistrationOpen ? (
          <Button
            sx={{
              margin: 1,
              backgroundColor: '#ffffff',
              color: '#000000',
              '&:hover': {
                backgroundColor: '#dddddd',
              },
            }}
            variant="outlined"
            onClick={handleRegister}
          >
            Register
          </Button>
        ) : (
          <Button disabled sx={{ margin: 1 }} variant="outlined">
            Register
          </Button>
        )}
      <Typography
        variant="body"
        color="text.secondary"
        sx={{
          marginLeft: 'auto',
          '&:hover': {
            cursor: 'pointer',
            color: '#b56f2b', // Change the color on hover
          },
        }}
        onClick={handleExpandClick}
      >
        Read more
        <ExpandMoreIcon
          sx={{
            fontSize: '25px',
            verticalAlign: 'middle',
            marginLeft: '4px', // Adjust the spacing between text and icon
            transition: 'transform 0.3s ease', // Smooth transition on hover
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', // Rotate icon based on expanded state
            '&:hover': {
              color: 'black', // Change the icon color on hover
            },
          }}
        />
      </Typography>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {!isRegistrationOpen ? (
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography paragraph>Registration opens on: {register_start_date}</Typography>
            </Collapse>
          ) : <Typography paragraph>Registration closing on: {register_end_date}</Typography>}
          <Typography paragraph>
            {long_description}
          </Typography>
        </CardContent>
      </Collapse>
      <EventRegisterModal open={openModal} onClose={handleCloseModal} eventId={selectedEvent} />
    </Card>
  );
}
