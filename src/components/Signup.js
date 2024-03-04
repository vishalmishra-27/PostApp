import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';

// Signup component
const Signup = () => {
    // Initialize state variables
    const [credentials, setCredentials] = useState({ username: "", email: "", password: "", cpassword: "", name: "", profilePicture: "" });
    const [agreeTerms, setAgreeTerms] = useState(false);
    const navigate = useNavigate(); // Get navigation function
    const host = "http://localhost:2000"; // Backend host URL

    // Function to send welcome email
    const sendWelcomeEmail = (email) => {
        alert(`Welcome email sent to ${email}`);
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Check if user agreed to terms and conditions
        if (!agreeTerms) {
            alert('Please agree to the terms and conditions.');
            return;
        }

        // Check if passwords match
        if (credentials.cpassword === credentials.password) {
            try {
                // Send signup request to backend
                const response = await fetch(`${host}/api/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: credentials.username,
                        email: credentials.email,
                        password: credentials.password,
                        name: credentials.name,
                        profilePicture: credentials.profilePicture
                    })
                });

                const json = await response.json(); // Parse JSON response

                // If signup is successful, save token and navigate to 'Post' page
                if (json.token) {
                    localStorage.setItem('token', json.token);
                    localStorage.setItem('currentUser', credentials.email);
                    sendWelcomeEmail(credentials.email);
                    navigate("/Post");
                } else {
                    // If user already exists, show alert
                    alert("User with this email already exists");
                }
            } catch (error) {
                console.error('Error signing up user:', error.message);
                alert("Error signing up user. Please try again later.");
            }
        } else {
            // If passwords do not match, show alert
            alert('Passwords do not match');
        }
    };

    // Function to handle input changes
    const onChange = (event) => {
        // Update credentials state with new input value
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    // Render the signup form
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="signupcontainer">
                        <h1 className='signupheading'>SIGN UP</h1>

                        {/* Input fields for username, email, password, confirm password */}
                        <label htmlFor="usernameinput"><b>Username</b></label>
                        <input id='usernameinput' type="text" autoComplete='on' onChange={onChange} value={credentials.username} placeholder="Enter your username" name="username" required />

                        <label htmlFor="emailinput"><b>E-mail</b></label>
                        <input id='emailinput' type="email" autoComplete='on' onChange={onChange} value={credentials.email} placeholder="Enter your e-mail" name="email" required />

                        <label htmlFor="passwordinput"><b>Password</b></label>
                        <input id='passwordinput' type="password" onChange={onChange} value={credentials.password} placeholder="Enter Password" name="password" required />

                        <label htmlFor="cpasswordinput"><b>Confirm Password</b></label>
                        <input id='cpasswordinput' type="password" onChange={onChange} value={credentials.cpassword} placeholder="Confirm Password" name="cpassword" required />

                        {/* Optional input fields for name and profile picture */}
                        <label htmlFor="nameinput"><b>Name</b></label>
                        <input id='nameinput' type="text" onChange={onChange} value={credentials.name} placeholder="Enter your name" name="name" />

                        <label htmlFor="profilePictureInput"><b>Profile Picture</b></label>
                        <input id='profilePictureInput' type="file" onChange={onChange} value={credentials.profilePicture} name="profilePicture" />

                        {/* Checkbox for terms and conditions */}
                        <button id='submitbutton' type="submit">Signup</button>
                        <label id='checkbox'>
                            <input
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                            />
                            I agree to the terms and conditions
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup; // Export the Signup component
