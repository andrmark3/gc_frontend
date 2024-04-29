// import React, { useState } from 'react';
// import { styled } from '@mui/material/styles';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';

// const ModalBox = styled(Box)(({ theme }) => ({
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     backgroundColor: 'white',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(4),
//     outline: 'none',
//     width: '600px',
//     height: '400px',
//     [theme.breakpoints.down('md')]: {
//         width: '90%',
//         height: 'auto',
//         maxHeight: '400px',
//     },
// }));

// const CloseButton = styled(Button)(({ theme }) => ({
//     position: 'absolute',
//     bottom: theme.spacing(5),
//     right: theme.spacing(10),
//     paddingInline: 30,
// }));

// const AddEventButton = styled(Button)(({ theme }) => ({
//     position: 'absolute',
//     bottom: theme.spacing(5),
//     left: theme.spacing(10),
// }));

// const UploadBox = styled('div')({
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
// });

// export default function EventCreation({ open, onClose }) {
//     const [title, setTitle] = useState('');

//     const handleTitleChange = (event) => {
//         setTitle(event.target.value);
//     };

//     const handleImageChange = (event) => {
//         // Handle image upload
//         const uploadedImage = event.target.files[0];
//         // Handle further operations, such as storing the image data or displaying a preview
//         // return uploadedImage
//         console.log('Uploaded image:', uploadedImage);
//     };

//     const handleSubmit = () => {
//         // Handle form submission, e.g., send data to backend
//         // Reset form fields
//         setTitle('');
//         // Close the modal
//         onClose();
//     };

//     return (
//         <Modal
//             open={open}
//             onClose={onClose}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//         >
//             <ModalBox>
//                 <CloseButton onClick={onClose} variant="outlined">
//                     Close
//                 </CloseButton>
//                 <h2>Add New Event</h2>
//                 <TextField
//                     label="Title"
//                     value={title}
//                     onChange={handleTitleChange}
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                 />
//                 {/* Styled file input for uploading image */}
//                 <UploadBox>
//                     <Button variant="contained" component="label">
//                         Upload Image
//                         <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
//                     </Button>
//                 </UploadBox>
//                 <AddEventButton variant="contained" color="primary" onClick={handleSubmit}>
//                     Add Event
//                 </AddEventButton>
//             </ModalBox>
//         </Modal>
//     );
// }
