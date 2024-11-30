import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

//pages

import HomePage from "./Home";
import LoginPage from "./login/login";
import UserList from "./listView/UserList"
import GameList from "./listView/GameList"
import Header from "./header";
import Game from "./item/Game"
import User from "./item/User"

export default function App() {
    return (
        <div>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/games" element={<GameList />} />
                    <Route path="/games/:id" element={<Game />} />
                    <Route path="/users/:id" element={<User />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
