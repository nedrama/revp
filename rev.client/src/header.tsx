import { useState } from 'react'
import './header.css';
function Header() {
    // adding the states 
    const [isActive, setIsActive] = useState(false);
    //add the active class
    const toggleActiveClass = () => {
        setIsActive(!isActive);
    };
    //clean up function to remove the active class
    const removeActive = () => {
        setIsActive(false)
    }
    return (
        <div className="App">
            <header className="App-header">
                <nav className="navbar">
                    {/* logo */}
                    <a href='/' className="logo">Rev. </a>
                    <ul className={`navMenu ${isActive ? 'active' : ''}`}>
                        <li onClick={removeActive}>
                            <a href='/' className="navlink">Home</a>
                        </li>
                        <li onClick={removeActive}>
                            <a href='/games' className="navlink">Games</a>
                        </li>
                        <li onClick={removeActive}>
                            <a href='/users' className="navlink">Users</a>
                        </li>
                        <li onClick={removeActive}>
                            <a href='/newGame' className="navlink">Add game</a>
                        </li>
                        <li onClick={removeActive}>
                            <a href='/newUser' className="navlink">Add user</a>
                        </li>
                        <li onClick={removeActive}>
                            <a href='/login' className="navlink">Login</a>
                        </li>
                        <li onClick={removeActive}>
                            <a href='/register' className="navlink">Register</a>
                        </li>
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
}
export default Header;