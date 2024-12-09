import { useEffect, useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { UserInterface } from '../assets/interfaces';
import { Box, Divider, List, ListItem, ListItemText } from '@mui/material';
//import { toast } from 'sonner';

function UserList() {
    const [User, setUser] = useState<UserInterface[]>();

    useEffect(() => {
        populateUserData().catch((err) => {
            console.log(err)
        });
    }, []);

    const contents = User === undefined
        ? <p><em>Loading...</em></p>
        :
        <List>
            {User.map((item, index) => (
                <div key={index}>
                    <Link to={`/users/${item.id}`}>
                        <ListItem>
                            <ListItemText primary={item.username} secondary={item.isCompany ? "Company" : item.role} />
                        </ListItem>
                    </Link>
                    {/* Optional divider between list items */}
                    {index < User.length - 1 && <Divider />}
                </div>
            ))}
        </List>

    return (
        <Box sx={{ width: '80%', margin: '0 auto' }}>
            <h1>Users</h1>
            {contents}
        </Box>
    );

    async function populateUserData() {
        const response = await fetch('api/User');
        const data = await response.json();
        setUser(data);
    }
}

export default UserList;