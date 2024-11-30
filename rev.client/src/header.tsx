import "./header.css";
function Header() {

    return (

        <header className="header">
            <img src="logo.png" alt="Company Logo" className="logo" />
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/users">All users</a></li>
                    <li><a href="/games">All games</a></li>
                    <li><a href="/login">Log in</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;