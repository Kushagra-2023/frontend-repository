import React, { useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import TrainIcon from "@mui/icons-material/Train";
import { useNavigate } from "react-router-dom"; // Import useNavigate


const Signup = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate(); // Hook for navigation

    const handleSignup = async () => {
        if (
            username.trim() === "" ||
            name.trim() === "" ||
            email.trim() === "" ||
            password.trim() === ""
        ) {
            setError("All fields are required!");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/accounts/register", {
                username,
                name,
                email,
                password,
            });

            if (response.data.success) {
                setSuccessMessage(response.data.message);
                setError("");
                setUsername("");
                setName("");
                setEmail("");
                setPassword("");
                navigate("/"); // Redirect to signup page

            } else {
                setError(response.data.message);
                setSuccessMessage("");
            }
        } catch (err) {
            setError("An error occurred while signing up.");
            setSuccessMessage("");
        }
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

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <TrainIcon />
                    </Avatar>
                    <Typography variant="h5" gutterBottom>
                        Sign up
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
                    label="Name"
                    variant="standard"
                    fullWidth
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ marginTop: 2 }}
                />
                <TextField
                    label="Email"
                    type="email"
                    variant="standard"
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                {error && (
                    <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
                        {error}
                    </Typography>
                )}
                {successMessage && (
                    <Typography color="primary" variant="body2" sx={{ marginTop: 1 }}>
                        {successMessage}
                    </Typography>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSignup}
                    fullWidth
                    sx={{ marginTop: 2 }}
                >
                    Sign up
                </Button>
            </Paper>
        </Grid>
    );
};

export default Signup;
