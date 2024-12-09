import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { UserInterface } from "../assets/interfaces";
import axios from "axios";
import { Box, Card, CardContent, Grid, Typography, Button, Alert, AlertColor, Snackbar } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';



const User = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserInterface>();
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<AlertColor>('success');
    const [message, setMessage] = useState('');
    const userRole = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");

    const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    // Fetch slug from route parameters
    const { id } = useParams();

    useEffect(() => {
        getUser(Number(id)).catch((err) => {
            console.log(err);
        });
    }, [id]);

    return (
            user === undefined ? <Box className="content"><h1>User not found</h1></Box> :
            <Box className="content" sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
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
                    <Card variant="outlined" className="userContent">
                        <CardContent>
                            <Grid container spacing={2} direction="column">
                                {/* User Info */}
                                <Grid item>
                                    <Typography variant="h5" component="h2">
                                        {user.username}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1" color="textSecondary">
                                        {user.email}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1" color="textSecondary" sx={{ marginTop: 1 }}>
                                        {user.isCompany ? "Company" : user.role}
                                    </Typography>
                                </Grid>
                            </Grid>
                        {/* Edit Button */}
                        {UserControl()}
                        </CardContent>
                    </Card>
                </Box>
    );

    function UserControl() {

        return (
            userRole === "Admin" || (userRole === "User" && userId !== null && parseInt(userId) === user?.id) ?
                <Box sx={{ textAlign: 'right', marginTop: 2 }}>
                    <Button
                        variant="outlined"
                        component={Link}  // Link to the Edit Profile page
                        to={`/users/${user?.id}/edit`}
                        startIcon={<Edit />}
                        sx={{ textTransform: 'none' }}
                    >
                        Edit Profile
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<Delete />}
                        sx={{ textTransform: 'none' }}
                        onClick={DeleteUser}
                    >
                        Delete Profile
                    </Button>
                </Box> :
                <></>

        );
    }

    async function getUser(id: number) {
        const response = await fetch(`../api/User/${id}`);
        const data = await response.json();
        setUser(data.data);
    }
    function DeleteUser() {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        axios
            .delete(`../api/User/${id}`)
            .then(() => {
                setSeverity('success');
                setMessage("user deleted");
                setOpen(true);
                navigate(`/users`);
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
};



export default User;