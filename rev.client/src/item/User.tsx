import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { UserInterface } from "../assets/interfaces";
import { toast } from "sonner";
import axios from "axios";



const User = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserInterface>();

    // Fetch slug from route parameters
    const { id } = useParams();

    useEffect(() => {
        getUser(Number(id)).catch((err) => {
            console.error(err.response.data.message)
            toast.error(err.response.data.message)
        });
    }, [id]);

    return (
        <div className="container">
            <p>{user?.username}</p>
            <p>{user?.email}</p>
            <p>{user?.isCompany ? "Company" : user?.role}</p>
            <p><Link to={`/users/${user?.id}/edit`}>Edit</Link></p>
            <button onClick={DeleteUser}>Delete</button>
        </div>
    );

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
            .then((response) => {
                toast.message(response.data);
                navigate(`/users`);
            })
            .catch((err) => {
                console.log(err.response.data.message);
                toast.error(err.response.data.message);
            }
            );
    }
};



export default User;