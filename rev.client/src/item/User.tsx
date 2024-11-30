import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserInterface } from "../assets/interfaces";
import { toast } from "sonner";



const User = () => {
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
        </div>
    );

    async function getUser(id: number) {
        const response = await fetch(`../api/User/${id}`);
        const data = await response.json();
        setUser(data.data);
    }
};



export default User;