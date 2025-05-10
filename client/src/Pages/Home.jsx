import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../Css/Home.css'
import { getCurrentUser } from "../api/api";

export default function Home() {
    const currentUser = getCurrentUser();
    console.log("my user:", currentUser)
    if (!currentUser) return <p>No user info available.</p>;
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const navigate = useNavigate();

    // Toggle the visibility of the popup
    const toggleInfo = () => {
        setIsInfoVisible(!isInfoVisible);
    };

    // Close the popup when clicking on the background
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            toggleInfo();
        }
    };

    const LogoutBtn = () => {
        localStorage.removeItem("currentUser");
        navigate('/login', { replace: true });
    };


    return (
        <>
            <header className="header">
                <div className="left-links">
                    <Link to={`/users/${currentUser.id}/todos`}>Todos</Link>
                    <Link to={`/users/${currentUser.id}/posts`}>Posts</Link>
                </div>
                <div className="right-section">
                    <span className="user-name">Welcome, {currentUser.user_name}</span>
                    <button onClick={toggleInfo}>Info</button>
                    <button onClick={LogoutBtn}>LogOut</button>
                </div>
            </header>
            <main className='main_content'>
                <Outlet context={currentUser} />
            </main>
            {/* Popup */}
            {isInfoVisible && (
                <div className="popup" onClick={handleBackgroundClick}>
                    <div className="popup-content">
                        <h2>User Information</h2>
                        <p><strong>Name:</strong> {currentUser.user_name}</p>
                        <p><strong>Email:</strong> {currentUser.email}</p>
                        <p><strong>Phone:</strong> {currentUser.phone_number}</p>
                    </div>

                </div>
            )}
        </>
    );
}