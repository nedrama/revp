import { useEffect, useState } from 'react'
import './header.css';
import logo from './assets/vecteezy_eagle-bird-logo-design-template_16834440.svg'
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Modal from './assets/modal';
import styled from "styled-components";
import { useNotification } from './assets/NotificationContext';
function Header() {
    const ModalContent = styled.div`
    font-family: 'Yuji Mai', sans-serif;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5000;
  h1 {
    color: #5c3aff;
  }
`;
    // adding the states 
    const navigate = useNavigate();
    const [isOpen, toggle] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [userName, setUserName] = useState(() => {
        const savedValue = localStorage.getItem('userName');
        return savedValue ? savedValue : '';
    });
    const [userRole, setUserRole] = useState(() => {
        const savedValue = localStorage.getItem('userRole');
        return savedValue ? savedValue : '';
    });
    const [userId, setUserId] = useState(() => {
        const savedValue = localStorage.getItem('userId');
        return savedValue ? savedValue : '';
    });
    const { event, setEvent } = useNotification();




    useEffect(() => {
        const handleStorageChange = () => {

            setUserName(localStorage.getItem('userName') || '');
            setUserRole(localStorage.getItem('userRole') || '');
            setUserId(localStorage.getItem('userId') || '');
        };
        if (event === "log in") {
            handleStorageChange();
        }
        setEvent('');
        // Listen for changes in localStorage
        window.addEventListener('storage', handleStorageChange);

        // Cleanup the event listener
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [event, setEvent]);

    const toggleActiveClass = () => {
        setIsActive(!isActive);
    };
    //clean up function to remove the active class
    const removeActive = () => {
        setIsActive(false)
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Function to handle closing the menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    

    // Function for "Sign Out" action
    function handleSignOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userName");
        setUserId('');
        setUserName('');
        setAnchorEl(null);
        setUserRole('');
        navigate('/');
    }
    function handleProfile() {
        setAnchorEl(null); // Close the menu
        navigate(`/users/${userId}`);
    }

    function GetProfile() {
            return (<div>
                {/* IconButton to trigger the dropdown */}
                <IconButton onClick={handleClick} size="large">
                    <Typography variant="body1" sx={{ marginLeft: 1 }}>
                        {userName }
                    </Typography>
                </IconButton>

                {/* Menu (Dropdown) */}
                <Menu
                    anchorEl={anchorEl}   // The button to anchor the menu to
                    open={Boolean(anchorEl)}  // Controls visibility of the menu
                    onClose={handleClose} // Closes the menu when clicking outside
                >
                    {/* Profile Link */}
                    <MenuItem onClick={handleProfile}>
                        <Typography variant="body1">Profile</Typography>
                    </MenuItem>
                    {/* Sign Out Link */}
                    <MenuItem onClick={handleSignOut}>
                        <Typography variant="body1" color="error">
                            Sign Out
                        </Typography>
                    </MenuItem>
                </Menu>
            </div>);
    }


    return (
        <div className="App">
            <header className="App-header">
                <nav className="navbar">
                    {/* logo */}
                    <img src={logo} onClick={() => handleOpenModal(true)} />
                    <div className="popUp">
                        <Modal isOpen={isOpen} handleClose={() => handleOpenModal(false)} >
                            <ModalContent >
                                <h1> <a href="https://www.vecteezy.com/free-vector/logo">Logo Vectors by Vecteezy</a> </h1>
                            </ModalContent>
                        </Modal>
                    </div>
                    <ul className={`navMenu ${isActive ? 'active' : ''}`}>
                        <li onClick={removeActive}>
                            <a href='/games' className="navlink">Games</a>
                        </li>
                        <li onClick={removeActive}>
                            <a href='/users' className="navlink">Users</a>
                        </li>
                        {linksByRole()}
                    </ul>
                    <div className={`hamburger ${isActive ? 'active' : ''}`} onClick={toggleActiveClass}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </nav>
            </header>
            
        </div>
    );

    function handleOpenModal(open: boolean) {
        toggle(open);
    }
    function linksByRole(){
        return (
            userRole === "Admin" ?
            <><li onClick={removeActive}>
                            <a href='/newGame' className="navlink">Add game</a>
                        </li>
                        <li onClick={removeActive}>
                            <a href='/newUser' className="navlink">Add user</a>
                    </li>
                    <li>
                        {GetProfile()}
                    </li>
                </>
                : userRole === "User" ?
                    <><li onClick={removeActive}>
                        <a href='/newGame' className="navlink">Add game</a>
                    </li>
                        <li>
                            {GetProfile()}
                        </li></>
                    :
                    <><li onClick={removeActive}>
                            <a href='/login' className="navlink">Login</a>
                        </li>
                        <li onClick={removeActive}>
                            <a href='/register' className="navlink">Register</a>
                        </li></>
        );
    }
}
export default Header;