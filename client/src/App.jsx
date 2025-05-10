import './Css/App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import Todos from './Pages/Todos'
import Posts from './Pages/Posts'
import { getCurrentUser } from "./api/api";
import { useState, useEffect } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  
    useEffect(() => {
      const user = getCurrentUser();
      setCurrentUser(user);
    }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="login" replace />} />
        <Route path="login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="register" element={<Register />} />

        <Route path="home" element={<Home />} />

        <Route path="/" element={<Home />}>
          <Route path="users/:userId/todos" element={<Todos />} />
          <Route path="users/:userId/posts" element={<Posts />} />
        </Route>

      </Routes>
    </BrowserRouter >

  )
}

export default App
