import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

//pages

import HomePage from "./Home";
import LoginPage from "./login/login";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}
