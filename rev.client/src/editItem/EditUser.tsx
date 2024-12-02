import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { UserInterface } from "../assets/interfaces";



function EditUser() {

    const [user, setUser] = useState<UserInterface>();

    // Fetch slug from route parameters
    const { id } = useParams();

    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("User");
    const [password, setPassword] = useState("");
    const [isCompany, setCompany] = useState(false);

    useEffect(() => {
        async function fetchData() {
            getUser(Number(id)).then(
            ).catch((err) => {
                console.error(err.response)
                //toast.error(err.response.data.message)
            });
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        if (user) {
            setUserName(user.username);
            setEmail(user.email);
            setRole(user.role);
            setCompany(user.isCompany);
            setPassword(user.password);
        }
    }, [user]);

        

        function handleSubmit(event: React.FormEvent<EventTarget>) {
            const token = localStorage.getItem("token");

            if (token) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            }
            event.preventDefault();


            const userInfo = {
                userName: userName,
                email: email,
                isCompany: isCompany,
                role: role,
                password: password
            };

            axios
                .put(`../../api/User/${id}`, userInfo)
                .then((response) => {
                    toast.message(response.data);
                    navigate(`/users/${id}`);
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
    function handleRoleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setRole(event.target.value);
    }
    function handleCompanyChange() {
        setCompany(!isCompany);
    }
    async function getUser(id: number) {
        const response = await fetch(`../../api/User/${id}`);
        const data = await response.json();
        setUser(data.data);
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

export default EditUser;
