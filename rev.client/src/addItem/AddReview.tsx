import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';


function AddReview() {
    const navigate = useNavigate();
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const { id } = useParams();

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
                toast.message(response.data);
                navigate(`/games/${id}`);
            })
            .catch((err) => {
                console.log(err.response.data);
                toast.error(err.response.data.message);
            }
            );
    }

    function handleCommentChange(event: React.ChangeEvent<HTMLInputElement>) {
        //setUserName(event.target.value);
        setComment(event.target.value);
    }

    return (
        <><ToastContainer />
            <div>
                New Review
                <form onSubmit={handleSubmit}>
                    <label>
                        Comment:
                        <input type="text" value={comment} onChange={handleCommentChange} />
                    </label>
                    <label>
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
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </>
    );
}

export default AddReview;
