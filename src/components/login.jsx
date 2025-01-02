import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Paper, Avatar, Button, TextField, Typography, Checkbox, Link } from "@mui/material";
import Grid from "@mui/material/Grid2";
import FormControlLabel from "@mui/material/FormControlLabel";
import TrainIcon from "@mui/icons-material/Train";
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate(); // Hook for navigation
    const [userId, setUserId] = useState("");

    useEffect(() => {
        localStorage.removeItem('userId'); // Clear userId
      }, []); 

    const handleLogin = async () => {
        if (username.trim() === "" || password.trim() === "") {
            setError("Both fields are required!");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/accounts/login", {
                username,
                password,
            });
        
            // Check the response
            if (response.data.success) {
                setError("");
                // alert("Login successful!");
                console.log(response.data.user_id);
                console.log(userId);
                localStorage.setItem('userId', response.data.user_id)
                localStorage.setItem('jwt_token', response.data.access_token);
                navigate("/homepage"); // Redirect to dashboard (adjust route as needed)
            } else {
                setError("Invalid username or password!");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setError("An error occurred while logging in. Please try again later.");
        }
    }
        

    const handleSignupNavigation = () => {
        navigate("/signup"); // Redirect to signup page
    };

    const paperStyle = {
        padding: 20,
        width: "20vw",
        margin: "10vh auto",
        borderRadius: "15px"
    };

    const avatarStyle = {
        backgroundColor: "#1976D2",
    };

    const formControlStyle = {
        textAlign: "left",
        width: "100%",
        marginTop: 20,
    };

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <TrainIcon />
                    </Avatar>
                    <Typography variant="h5" gutterBottom>
                        Sign in
                    </Typography>
                </Grid>
                <TextField
                    label="Username"
                    variant="standard"
                    fullWidth
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ marginTop: 2 }}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="standard"
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ marginTop: 2 }}
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label="Remember me?"
                    style={formControlStyle}
                />
                {error && (
                    <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
                        {error}
                    </Typography>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    onChange={() => setIsAdmin(false)}
                    onClick={handleLogin}
                    fullWidth
                    sx={{ marginTop: 2 }}
                >
                    Login
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onChange={() => setIsAdmin(true)}
                    onClick={handleLogin}
                    fullWidth
                    sx={{ marginTop: 2 }}
                >
                    Login as Admin
                </Button>
                <Typography style={{ marginTop: 20 }}>
                    Don't have an account?
                    <Link onClick={handleSignupNavigation} sx={{ ml: 1, cursor: "pointer" }}>
                        Signup
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
};

export default Login;
