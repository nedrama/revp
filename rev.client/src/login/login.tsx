import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


function LoginPage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    function handleSubmit(event: React.FormEvent<EventTarget>) {
        event.preventDefault();

        const loginPayload = {
            userName: userName,
            password: password,
            email: email
        };

        axios
            .post("api/Auth/Login", loginPayload)
            .then((response) => {
               const token = response.data.data.token;
               localStorage.setItem("token", token);

                if (token) {
                        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                        navigate("/");
                }
                else {
                     toast.error("Failed to login")
                }
            })
            .catch((err) => {
                console.log(err.response.data.message);
                toast.error(err.response.data.message);
            }
            );
    }

    function handleUserNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        //setUserName(event.target.value);
        setUserName(event.target.value);
    }
    function handleUserEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function handlePasswordhange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    return (
        <><ToastContainer />
        <div>
            Login Page
            <form onSubmit={handleSubmit}>
                <label>
                    User Name:
                    <input type="text" value={userName} onChange={handleUserNameChange} />
                </label>
                <label>
                    E-mail:
                    <input type="text" value={email} onChange={handleUserEmailChange} />
                </label>
                <label>
                    Password:
                    <input type="text" value={password} onChange={handlePasswordhange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            </div>
        </>
    );
}

export default LoginPage;
