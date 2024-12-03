import "./header.css";
function Header() {

    return (

        <header className="header">
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/users">All users</a></li>
                    <li><a href="/games">All games</a></li>
                    <li><a href="/login">Log in</a></li>
                    <li><a href="/register">Register</a></li>
                    <li><a href="/newUser">Add user</a></li>
                    <li><a href="/newGame">Add game</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;