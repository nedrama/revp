import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { Alert, AlertColor, Box, Button, Container, Rating, Snackbar, TextField, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';


function AddReview() {
    const navigate = useNavigate();
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const { id } = useParams();
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

        const reviewInfo = {
            comment: comment,
            rating: rating,
            gameId: id
        };

        axios
            .post("../../api/Review", reviewInfo)
            .then((response) => {
                setSeverity('success');
                setMessage(response.data);
                setOpen(true);
                navigate(`/games/${id}`);
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

    function handleCommentChange(event: React.ChangeEvent<HTMLInputElement>) {
        //setUserName(event.target.value);
        setComment(event.target.value);
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
                    New Review
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="comment"
                        label="Comment"
                        name="Comment"
                        autoComplete="comment"
                        autoFocus
                        value={comment}
                        onChange={handleCommentChange}
                    />
                    <Rating
                        value={rating}
                            precision={1}
                            onChange={(_event, value) => {
                                if (value)
                                    setRating(value);
                            }}
                            onChangeActive={(_event, value) => {
                                if(value)
                                setRating(rating);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
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

export default AddReview;
