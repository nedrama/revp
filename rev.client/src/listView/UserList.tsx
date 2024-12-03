import { useEffect, useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { UserInterface } from '../assets/interfaces';
//import { toast } from 'sonner';

function UserList() {
    const [User, setUser] = useState<UserInterface[]>();

    useEffect(() => {
        populateUserData().catch((err) => {
            console.error(err.response)
            //toast.error(err.response.data.message)
        });
    }, []);

    const contents = User === undefined
        ? <p><em>Loading...</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {User.map(user =>
                    <tr key={user.id}>
                        <Link to={`/users/${user.id}`}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.isCompany ? "Company" : "User"}</td>
                        </Link>
                        </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Users</h1>
            {contents}
        </div>
    );

    async function populateUserData() {
        const response = await fetch('api/User');
        const data = await response.json();
        setUser(data);
    }
}

export default UserList;