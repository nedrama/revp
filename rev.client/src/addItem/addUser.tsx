import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { Container, Box, Typography, TextField, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Button,  SelectChangeEvent, Alert, AlertColor, Snackbar } from "@mui/material";


function AddUser() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("User");
    const [isCompany, setCompany] = useState(false);
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

        const userInfo = {
            userName: userName,
            password: password,
            email: email,
            isCompany: isCompany,
            role: role
        };

        axios
            .post("api/User", userInfo)
            .then((response) => {
                setSeverity('success');
                setMessage(response.data);
                setOpen(true);
                navigate("/users");
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

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }
    function handleRoleChange(event: SelectChangeEvent) {
        setRole(event.target.value);
    }
    function handleCompanyChange() {
        setCompany(!isCompany);
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
                    New User
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
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
                        onChange={handlePasswordChange}
                    />
                    <InputLabel>Role</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={role}
                        label="Role"
                        onChange={handleRoleChange}
                        fullWidth
                    >
                        <MenuItem value={"User"}>User</MenuItem>
                        <MenuItem value={"Admin"}>Administrator</MenuItem>
                    </Select>
                    <FormControlLabel control={<Checkbox checked={isCompany} onChange={handleCompanyChange} />} label="Company" />
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

export default AddUser;
