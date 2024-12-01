import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


function AddGame() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

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
                toast.message(response.data);
                navigate("/games");
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

export default AddGame;
