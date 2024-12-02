import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Link, useParams, useNavigate } from "react-router-dom";
import { GameInterface, UserInterface, ReviewInterface } from "../assets/interfaces";
import axios from "axios";
const Game = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserInterface[]>();
    const [game, setGame] = useState<GameInterface>();
    const [reviews, setReviews] = useState<ReviewInterface[]>();

    // Fetch slug from route parameters
    const { id } = useParams();

    useEffect(() => {
        getGame(Number(id)).catch((err) => {
            console.error(err.response)
            //toast.error(err.response.data.message)
            });
        populateUserData().catch((err) => {
            console.error(err.response)
            //toast.error(err.response.data.message)
        });
    }, [id]);

    useEffect(() => {
        if (game) {
            populateReviewData(game.id).catch((err) => {
                console.log(err)
                //toast.error(err.response.data.message)
            });
        }
    }, [game]);


    return (
        <>{gameData(game)}
            <ReviewData />
            <Link to={`/games/${id}/newReview`}><td>Add Raview</td></Link>
        </>

    )
    function gameData(game?: GameInterface) {
        return (
            <div className="container">
                <p>{game?.title}</p>
                <p>{game?.description}</p>
                <p><Link to={`/users/${game?.userId}`}>{GetUser(game?.userId)}</Link></p>
                <p><Link to={`/games/${game?.id}/edit`}>Edit</Link></p>
                <button onClick={DeleteGame}>Delete</button>
            </div>
        )
    }

    
    function ReviewData() {
        if (reviews) {
            return (
                <table className="table table-striped" aria-labelledby="tableLabel">
                    <thead>
                        <tr>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Made by</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reviews === undefined 
                                ? <p><em>Loading...</em></p>
                                : reviews.length ? 
                                    reviews.map(review =>
                                        <tr key={review.id}>
                                            <td>{review.rating}</td>
                                            <td>{review.comment}</td>
                                            <Link to={`/users/${review.userId}`}><td>{GetUser(review.userId)}</td></Link>
                                            <Link to={`/reviews/${review.id}/edit`}><td>Edit</td></Link>
                                            <button onClick={() => {
                                                DeleteReview(review.id);
                                            }}
                                            > Delete</button>
                                        </tr>) :
                                    <tr key={(reviews as unknown as ReviewInterface).id}>
                                        <td>{(reviews as unknown as ReviewInterface).rating}</td>
                                        <td>{(reviews as unknown as ReviewInterface).comment}</td>
                                        <Link to={`/users/${(reviews as unknown as ReviewInterface).userId}`}><td>{GetUser((reviews as unknown as ReviewInterface).userId)}</td></Link>
                                        <Link to={`/reviews/${(reviews as unknown as ReviewInterface).id}/edit`}><td>Edit</td></Link>
                                        <button onClick={() => {
                                            DeleteReview((reviews as unknown as ReviewInterface).id);
                                        }}
                                        > Delete</button>
                                        </tr>
                                 
                            }
                    </tbody>
                </table>
            )
        }
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
            return "Unknown";
        }
        if (users?.length !== undefined) {
            for (let i = 0; i < users.length; i++) {
                if (users.at(i)?.id === userId) {
                    return users.at(i)?.username;
                }
            }
        }
        return "Unknown";
    }

    function DeleteGame() {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        axios
            .delete(`../api/Game/${id}`)
            .then((response) => {
                toast.message(response.data);
                navigate(`/games`);
            })
            .catch((err) => {
                console.log(err.response.data.message);
                toast.error(err.response.data.message);
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
            .then((response) => {
                toast.message(response.data);
                populateReviewData(parseInt(id as string));
            })
            .catch((err) => {
                console.log(err.response.data.message);
                toast.error(err.response.data.message);
            }
            );
    }
    
};

export default Game;