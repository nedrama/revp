import axios from "axios";
import { useState, useEffect } from "react";
import { UserInterface } from "./assets/interfaces";
import { toast } from "sonner";
import './App.css';

function HomePage() {
    const [data, setData] = useState<UserInterface>();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            if (data === undefined) {
                axios
                    .get("api/Auth/getCurrentUser")
                    .then((response) => {
                        const data = response.data;
                        setData(data.data);
                    })
                    .catch((err) => toast.error(err));
            }
        }
    });

    return <div id="Content">Home Page {data === undefined ? "Guest" : "User: " + data.username} </div>;
}

export default HomePage;
