import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { Alert, AlertColor, Box, Button, Container, Snackbar, TextField, Typography } from "@mui/material";
import { useNotification } from '../assets/NotificationContext';


function LoginPage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<AlertColor>('success');
    const [message, setMessage] = useState('');
    const { setEvent } = useNotification();

    const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function handleSubmit(event: React.FormEvent<EventTarget>) {
        event.preventDefault();

        const loginPayload = {
            userName: userName,
            password: password,
            email: email
        };

        axios
            .post("api/Auth/Login", loginPayload)
            .then((response) => {
               const token = response.data.data.token;
               localStorage.setItem("token", token);

                if (token) {
                    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                    axios
                        .get("api/Auth/getCurrentUser")
                        .then((response) => {
                            const data = response.data.data;
                            localStorage.setItem("userId", data.id);
                            localStorage.setItem("userRole", data.role);
                            localStorage.setItem("userName", data.username);
                            setEvent("log in");
                        })
                        .catch((err) => console.log(err));
                   

                    setSeverity('success');
                    setMessage("Log in successful");
                    setOpen(true);

                        navigate("/");
                }
                else {
                    setSeverity('error');
                    setMessage("Failed to login");
                    setOpen(true);
                }
            })
            .catch((err) => {
                try {
                    if (err.response.data.message) {
                        setSeverity('error');
                        setMessage(err.response.data.message);
                        setOpen(true);
                    }
                    else {
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

    function handleUserNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        //setUserName(event.target.value);
        setUserName(event.target.value);
    }
    function handleUserEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function handlePasswordhange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
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
                    Log in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="Username"
                        autoComplete="username"
                        autoFocus
                        value={userName}
                        onChange={handleUserNameChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={handleUserEmailChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePasswordhange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Log In
                    </Button>
            </Box>
            </Box>
        </Container>
    );
}

export default LoginPage;
