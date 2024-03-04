import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Post.css';
import { useNavigate } from 'react-router-dom';

// Component for displaying posts and managing user actions
const Post = () => {
    let Navigate = useNavigate(); // Navigation hook from react-router-dom

    let host = `http://localhost:2000`; // Backend server host URL

    // State variables
    const [posts, setPosts] = useState([]); // Array of posts
    const [loading, setLoading] = useState(false); // Loading state
    const [page, setPage] = useState(1); // Current page number
    const [allPostsLoaded, setAllPostsLoaded] = useState(false); // Flag to indicate if all posts have been loaded
    const [oldPassword, setOldPassword] = useState(''); // Old password for password reset
    const [newPassword, setNewPassword] = useState(''); // New password for password reset
    const [showResetForm, setShowResetForm] = useState(false); // State variable to control the visibility of the reset password form

    // Function to handle user logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        localStorage.removeItem('currentUser'); // Remove current user from local storage
        Navigate("/"); // Navigate to home page
    };

    // Function to handle password reset
    const handleResetPassword = async () => {
        try {
            // Send reset password request to backend
            const response = await axios.post(`${host}/api/resetpassword`, {
                email: localStorage.getItem('currentUser'),
                oldPassword,
                newPassword
            });

            // Show success message to user
            alert(response.data.message);
            setShowResetForm(false); // Hide reset password form
        } catch (error) {
            alert('Old Password Incorrect'); // Alert user if old password is incorrect
        }
    };

    // Effect hook to load posts from backend
    useEffect(() => {
        const loadPosts = async () => {
            if (allPostsLoaded) return; // Stop making API calls if all posts have been loaded

            // Set loading to true
            setLoading(true);

            // Added a delay before making the API call so the loader is visible
            setTimeout(async () => {
                try {
                    const response = await axios.get(`${host}/api/posts?page=${page}`);
                    if (response.data.length === 0) {
                        setAllPostsLoaded(true); // Set flag to true if no more posts are returned
                    } else {
                        setPosts(prevPosts => [...prevPosts, ...response.data]);
                    }
                    setLoading(false);
                } catch (error) {
                    console.error('Error loading posts:', error);
                    setLoading(false);
                }
            }, 1500);
        };
        loadPosts();
    }, [page, allPostsLoaded]); // Re-run effect when page or allPostsLoaded changes

    // Function to handle scroll event
    const handleScroll = () => {
        if (allPostsLoaded || loading) return; // Stop handling scroll if all posts are loaded or currently loading

        if (
            window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight
        ) {
            return;
        }
        setPage(prevPage => prevPage + 1); // Increment page number when scrolled to the bottom
    };

    // Effect hook to add scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [allPostsLoaded, loading]); // Re-add event listener when allPostsLoaded or loading changes

    // JSX
    return (
        <div>
            <div >
                {localStorage.getItem('currentUser') &&
                    <div className='userdata' >
                        <div onClick={handleLogout}>LOG-OUT {localStorage.getItem('currentUser')}</div>
                        <div onClick={() => setShowResetForm(!showResetForm)} className='resetformcontainer'>
                            Reset Password
                        </div>
                    </div>
                }
            </div>

            {/* Reset password form */}
            {showResetForm && <div className='resetform'>
                <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button onClick={handleResetPassword}>CONFIRM</button>
            </div>
            }

            {/* Post feed */}
            {localStorage.getItem('currentUser') ?
                <div>
                    <h1 className='postsheading'>POST FEED</h1>
                    {posts.map(post => (
                        <div className='post' key={post._id}>
                            <h2>TITLE - {post.title}</h2>
                            <p>CONTENT - {post.content}</p>
                            <p>AUTHOR - {post.author}</p>
                        </div>
                    ))}
                    {loading &&
                        <div className="loader-container">
                            <div className="loader"></div>
                        </div>
                    }
                </div>
                :
                <div className='gotosignup' onClick={() => { Navigate('/') }} >Please Signup First</div>
            }
            {allPostsLoaded && <p className="end-message">YOU HAVE REACHED THE END OF THE POSTS LIST.</p>}
        </div>
    );
};

export default Post;
