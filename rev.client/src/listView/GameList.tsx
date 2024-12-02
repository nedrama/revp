import { useEffect, useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { GameInterface, UserInterface } from "../assets/interfaces";
//import { toast } from 'sonner';

function GameList() {
    const [Game, setGame] = useState<GameInterface[]>();
    const [User, setUser] = useState<UserInterface[]>();

    useEffect(() => {
        populateUserData().catch((err) => {
            console.error(err)
            //toast.error(err.response.data.message)
        });
        populateGameData().catch((err) => {
            console.error(err)
            //toast.error(err.response.data.message)
        });
    }, []);

    const contents = Game === undefined
        ? <p><em>Loading...</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Made by</th>
                </tr>
            </thead>
            <tbody>
                {
                    Game.map(game =>
                        <tr key={game.id}>
                            <Link to={`/games/${game.id}`}>
                                <td>{game.title}</td>
                                <td>{game.description}</td>
                                <Link to={`/users/${game.userId}`}><td>{GetUser(game.userId)}</td></Link>
                            </Link>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Games</h1>
            {contents}
        </div>
    );

    async function populateGameData() {
        const response = await fetch('api/Game');
        const data = await response.json();
        setGame(data);
    }
    async function populateUserData() {
        const response = await fetch('api/User');
        const data = await response.json();
        setUser(data);  
    }
    function GetUser(userId: number) {
        if (User?.length !== undefined) {
            for (let i = 0; i < User?.length; i++) {
                if (User?.at(i)?.id === userId) {
                    return User?.at(i)?.username;
                }
            }
        }
        return "User not found";
    }
}

export default GameList;