import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import "./App.css";

//pages

import LoginPage from "./login/login";
import UserList from "./listView/UserList"
import GameList from "./listView/GameList"
import Header from "./header";
import Game from "./item/Game";
import User from "./item/User";
import AddUser from "./addItem/AddUser";
import AddGame from "./addItem/AddGame";
import AddReview from "./addItem/AddReview";
import EditUser from "./editItem/EditUser";
import EditGame from "./editItem/EditGame";
import EditReview from "./editItem/EditReview";
import Register from "./login/Register";
import FooterComponent from "./Footer";
import { Box } from '@mui/material';
import { NotificationProvider } from './assets/NotificationContext';

export default function App() {
    return (
        <div>
            
            <BrowserRouter>
                <NotificationProvider>
                <Header />
                <Box className="pageContainer">
                <Routes>
                    <Route path="/" element={<Navigate to="/games" />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/games" element={<GameList />} />
                    <Route path="/games/:id" element={<Game />} />
                    <Route path="/users/:id" element={<User />} />
                    <Route path="/newUser" element={<AddUser />} />
                    <Route path="/newGame" element={<AddGame />} />
                    <Route path="/games/:id/newReview" element={<AddReview />} />
                    <Route path="/games/:id/edit" element={<EditGame />} />
                    <Route path="/users/:id/edit" element={<EditUser />} />
                    <Route path="/reviews/:id/edit" element={<EditReview />} />
                    </Routes>
                    
                    </Box>
                </NotificationProvider>
            </BrowserRouter>
            <FooterComponent />
            
        </div>
    );
}
