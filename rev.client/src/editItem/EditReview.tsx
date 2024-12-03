import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { ReviewInterface } from "../assets/interfaces";


function EditReview() {
    const navigate = useNavigate();
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [gameId, setId] = useState(0);
    const { id } = useParams();

    const [review, setReview] = useState<ReviewInterface>();

    useEffect(() => {
        async function fetchData() {
            getReview(Number(id)).then(
            ).catch((err) => {
                console.error(err.response)
                //toast.error(err.response.data.message)
            });
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        if (review) {
            setComment(review.comment);
            setRating(review.rating);
            setId(review.gameId);
        }
    }, [review]);

    function handleSubmit(event: React.FormEvent<EventTarget>) {
        const token = localStorage.getItem("token");

        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        event.preventDefault();

        const reviewInfo = {
            comment: comment,
            rating: rating
        };

        axios
            .put(`../../api/Review/${id}`, reviewInfo)
            .then((response) => {
                toast.message(response.data);
                navigate(`/games/${gameId}`);
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

    async function getReview(id: number) {
        const response = await fetch(`../../api/Review/${id}`);
        const data = await response.json();
        setReview(data.data);
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
                                if(value)
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

export default EditReview;
