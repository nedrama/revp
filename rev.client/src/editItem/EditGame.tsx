import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { GameInterface } from "../assets/interfaces";


function EditGame() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [game, setGame] = useState<GameInterface>();

    // Fetch slug from route parameters
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            getGame(Number(id)).then(
            ).catch((err) => {
                console.error(err.response)
                //toast.error(err.response.data.message)
            });
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        if (game) {
            setTitle(game.title);
            setDescription(game.description);
        }
    }, [game]);

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
            .put(`../../api/Game/${id}`, gameInfo)
            .then((response) => {
                toast.message(response.data);
                navigate(`/games/${id}`);
            })
            .catch((err) => {
                console.log(err.response.data.message);
                toast.error(err.response.data.message);
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
    async function getGame(id: number) {
        const response = await fetch(`../../api/Game/${id}`);
        const data = await response.json();
        setGame(data.data);
    }

    return (
        <><ToastContainer />
            <div>
                New Game
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input type="text" value={title} onChange={handleTitleChange} />
                    </label>
                    <label>
                        Description:
                        <input type="text" value={description} onChange={handleDescriptionChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </>
    );
}

export default EditGame;
