import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


function AddUser() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [isCompany, setCompany] = useState(false);

    function handleSubmit(event: React.FormEvent<EventTarget>) {
        const token = localStorage.getItem("token");

        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        event.preventDefault();

        const userInfo = {
            userName: userName,
            password: password,
            email: email,
            isCompany: isCompany,
            role: role
        };

        axios
            .post("api/User", userInfo)
            .then((response) => {
                toast.message(response.data);
                navigate("/users");
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

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }
    function handleRoleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setRole(event.target.value);
    }
    function handleCompanyChange() {
        setCompany(!isCompany);
    }

    return (
        <><ToastContainer />
            <div>
                New User
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
                        <input type="text" value={password} onChange={handlePasswordChange} />
                    </label>
                    <label>
                        Role:
                        <input type="" value={role} onChange={handleRoleChange} />
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={isCompany}
                            onChange={handleCompanyChange} />
                        Company
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </>
    );
}

export default AddUser;
