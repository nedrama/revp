import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Link, useParams } from "react-router-dom";
import { GameInterface, UserInterface, ReviewInterface } from "../assets/interfaces";

const Game = () => {
    const [users, setUsers] = useState<UserInterface[]>();
    const [game, setGame] = useState<GameInterface>();
    const [reviews, setReviews] = useState<ReviewInterface[]>();

    // Fetch slug from route parameters
    const { id } = useParams();

    useEffect(() => {
        getGame(Number(id)).catch((err) => {
            console.error(err.response.data.message)
            toast.error(err.response.data.message)
            });
        populateUserData().catch((err) => {
            console.error(err.response.data.message)
            toast.error(err.response.data.message)
        });
    }, [id]);

    useEffect(() => {
        if (game) {
            populateReviewData(game.id).catch((err) => {
                console.error(err.response.data.message)
                toast.error(err.response.data.message)
            });
        }
    }, [game]);

    return (
        <>{gameData(game)}
            {reviewData()}
        </>

    )
    function gameData(game?: GameInterface) {
        return (
            <div className="container">
                <p>{game?.title}</p>
                <p>{game?.description}</p>
                <p><Link to={`/users/${game?.userId}`}>{GetUser(game?.userId)}</Link></p>
            </div>
        )
    }

    
    function reviewData() {
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
                            reviews.map(review =>
                                <tr key={review.id}>
                                    <td>{review.rating}</td>
                                    <td>{review.comment}</td>
                                    <Link to={`/users/${review.userId}`}><td>{GetUser(review.userId)}</td></Link>
                                </tr>
                            )}
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
    async function populateReviewData(gameId: number | undefined) {
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
    
};

export default Game;