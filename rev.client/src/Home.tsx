import axios from "axios";
import { useState, useEffect } from "react";

interface User {
    id: number,
    username: string,
    email: string,
    isCompany: boolean
}

function HomePage() {
    const [data, setData] = useState<User>();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        if (data === undefined) {
            axios
                .get("api/Auth/getCurrentUser")
                .then((response) => {
                    const data = response.data;
                    setData(data.data);
                })
                .catch((err) => console.log(err));
        }
    });

    return <div>Home Page {data === undefined ? "default": data.id} </div>;
}

export default HomePage;
