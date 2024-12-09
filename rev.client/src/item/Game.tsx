import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { GameInterface, UserInterface, ReviewInterface } from "../assets/interfaces";
import axios from "axios";
import { Edit, Delete, Star } from "@mui/icons-material";
import { Box, Card, CardContent, Grid, Typography, Button, List, ListItem, ListItemIcon, ListItemText, Rating, IconButton, Alert, Snackbar, AlertColor } from "@mui/material";
const Game = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserInterface[]>();
    const [game, setGame] = useState<GameInterface>();
    const [reviews, setReviews] = useState<ReviewInterface[]>();
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
        getGame(Number(id)).catch((err) => {
            console.log(err)
            });
        populateUserData().catch((err) => {
            console.log(err)
        });
    }, [id]);

    useEffect(() => {
        if (game) {
            populateReviewData(game.id).catch((err) => {
                console.log(err)
            });
        }
    }, [game]);


    return (
        <Box className="content">
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
            {gameData(game)}
            <ReviewData />
                <Button
                    variant="outlined"
                    component={Link}  // Link to the Edit Profile page
                    to={`/games/${id}/newReview`}
                    startIcon={<Edit />}
                    sx={{ textTransform: 'none' }}
                >
                    Add Review
                </Button>
                </Box>

    )

    function GameControl() {
        
        return (
            userRole === "Admin" || (userRole === "User" && userId !== null && parseInt(userId) === game?.userId)? 
                <Box sx={{ textAlign: 'right', marginTop: 2 }}>
                    <Button
                        variant="outlined"
                        component={Link}  // Link to the Edit Profile page
                        to={`/games/${game?.id}/edit`}
                        startIcon={<Edit />}
                        sx={{ textTransform: 'none' }}
                    >
                        Edit Game
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<Delete />}
                        sx={{ textTransform: 'none' }}
                        onClick={DeleteGame}
                    >
                        Delete Game
                    </Button>
                </Box> :
                 <></>

        );
    }
    function gameData(game?: GameInterface) {
        return (
            game === undefined ? <h1>Game not found</h1> :
                
                <Card variant="outlined">
                    
                        <CardContent>
                            <Grid container spacing={2} direction="column">
                                {/* User Info */}
                                <Grid item>
                                    <Typography variant="h5" component="h2">
                                        {game.title}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" color="textSecondary">
                                        {game.description}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                                    {GetUser(game?.userId)}
                                        {/*Made by: <Link to={`/users/${game?.userId}`}>{}</Link>*/}
                                    </Typography>
                                </Grid>
                            </Grid>
                        {/* Edit Button */}
                        {GameControl()}
                        </CardContent>
                    </Card>
        )
    }

    function reviewControl(reviewUserId: number, reviewId: number) {
        return (
            userRole === "Admin" || (userRole === "User" && userId !== null && parseInt(userId) === reviewUserId) ?
                <><IconButton edge="end" color="primary" component={Link}  // Link to the Edit Profile page
                    to={`/reviews/${reviewId}/edit`}>
                    <Edit />
                </IconButton>
                        {/* Delete Button */ }
                <IconButton edge="end" color="error" onClick={() => DeleteReview(reviewId)}>
                    <Delete />
                </IconButton></> :
                <></>

        );
    }
    function ReviewData() {
        return (
            reviews === undefined ? <p></p>:
            <List>
                {reviews.map((review, index) => (
                    <ListItem key={index} sx={{ borderBottom: '1px solid #ddd', paddingBottom: 2 }}>
                        <ListItemIcon>
                            <Star color="primary" />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography variant="subtitle1">
                                    {GetUser(review.userId)}
                                </Typography>
                            }
                            secondary={
                                <>
                                    <Rating
                                        name={`rating-${index}`}
                                        value={review.rating}
                                        precision={1}
                                        readOnly
                                        size="small"
                                    />
                                    <Typography variant="body2" color="textSecondary">
                                        {review.comment}
                                    </Typography>
                                </>
                            }
                        />
                        {reviewControl(review.userId, review.id)}
                    </ListItem>
                ))}
            </List>
            )
        
        }
    async function getGame(id: number) {
        const response = await fetch(`../api/Game/${id}`);
        const data = await response.json();
        setGame(data.data);
    }
    async function populateReviewData(gameId: number | undefined){
        const response = await fetch(`../api/Game/${gameId}/Review`);
        const data = await response.json();
        setReviews(data);   
    }
    async function populateUserData() {
            const response = await fetch('../api/User');
        const data = await response.json();
        setUsers(data);

    }

    

    function GetUser(userId: number | undefined) {
        if (userId === undefined) {
            return <p>User Not Found</p>
        }
        if (users?.length !== undefined) {
            for (let i = 0; i < users.length; i++) {
                if (users.at(i)?.id === userId) {
                    return <Link to={`/users/${userId}`}>{users.at(i)?.username}</Link>;
                }
            }
        }
        return <p>User Not Found</p>
    }

    function DeleteGame() {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        axios
            .delete(`../api/Game/${id}`)
            .then(() => {
                setSeverity('success');
                setMessage('Game deleted');
                setOpen(true);
                navigate(`/games`);
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
    function DeleteReview(rid: number) {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        axios
            .delete(`../api/Review/${rid}`)
            .then(() => {
                setSeverity('success');
                setMessage("Review deleted");
                setOpen(true);
                const updatedReviews = reviews?.filter(item => item.id !== rid);
                setReviews(updatedReviews);
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

export default Game;