import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { Container, Box, Typography, TextField, Button, Alert, Snackbar, AlertColor } from "@mui/material";


function AddGame() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<AlertColor>('success');
    const [message, setMessage] = useState('');

    const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function handleSubmit(event: React.FormEvent<EventTarget>) {
        const token = localStorage.getItem("token");

        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        event.preventDefault();

        const gameInfo = {
            title: title,
            description: description
        };

        axios
            .post("api/Game", gameInfo)
            .then((response) => {
                setSeverity('success');
                setMessage(response.data);
                setOpen(true);
                navigate("/games");
            })
            .catch((err) => {
                try {
                    if (err.response.data.message) {
                        setSeverity('error');
                        setMessage(err.response.data.message);
                        setOpen(true);
                    }
                    else
                    {
                        setSeverity('error');
                        setMessage(err.response.data.errors.Title[0]);
                        setOpen(true);
                    }
                }
                catch (errr) {
                    console.log(errr);
                }
                
            }
            );
    }

    function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        //setUserName(event.target.value);
        setTitle(event.target.value);
    }
    function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value);
    }

    return (
        <Container component="main">
            <Snackbar
                open={open}
                autoHideDuration={3000} // Set duration to 3000ms (3 seconds)
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Position the Snackbar at the bottom center
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            <Box className="logReg">
                <Typography component="h1" variant="h5">
                    New Game
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="Title"
                        autoComplete="title"
                        autoFocus
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        name="Description"
                        autoComplete="description"
                        multiline
                        maxRows={5}
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
            
        </Container>
    );
}

export default AddGame;
