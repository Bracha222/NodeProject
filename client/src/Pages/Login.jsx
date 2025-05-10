
import { useState } from "react"
import { useNavigate, Link } from 'react-router-dom'
import "../Css/Login.css";
import { addData, saveCurrentUserInLS } from "../api/api";


export default function Login({setCurrentUser}) {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrorMessage('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrorMessage('');
    };

    const submitButton = async (event) => {
        event.preventDefault();
        setErrorMessage("");

        try {
            const result = await addData("user/login", { email, password });
            console.log("my user", result);

            if (result && result.success && result.user) {
                console.log("made it!!");
                setSuccessMessage("Login successful!");
                setErrorMessage('');
                saveCurrentUserInLS(result.user);
                setCurrentUser(result.user);
                setTimeout(() => {
                    navigate("/home");
                }, 500);

            } else {
                setErrorMessage("Invalid email or password");
                setSuccessMessage('');
            }
        } catch (err) {
            console.error(err);
            setErrorMessage("Login failed");
        }
    }
    return (
        <div className="center-content">
            <form onSubmit={submitButton}>
                <input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange} >
                </input>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}>
                </input>
                <button type="submit">Log-In</button>
                <Link to="/register" replace>Didn't sign up yet? Sign-Up</Link>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            </form>

        </div>

    )
}
