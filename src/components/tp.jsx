import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResponsiveAppBar from './navbar';

const TrainData = () => {
    const navItems = ['Dashboard', 'Profile', 'Settings', 'Logout'];
    const [data, setData] = useState([]); // State to store train data
    const [error, setError] = useState(null); // State to handle errors

    const url = "http://127.0.0.1:8000/booking/train";

    // useEffect(() => {
    //     // Fetch data from the API when the component mounts
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(url); // Perform GET request
    //             setData(response.data); // Set response data in state
    //         } catch (err) {
    //             setError(err.message); // Set error if request fails
    //         }
    //     };

    //     fetchData();
    // }, []); // Empty dependency array ensures this runs once after the component mounts

    // if (error) {
    //     return <p>Error fetching data: {error}</p>;
    // }

    return (
        <div>
            <ResponsiveAppBar pages={navItems} />
            <h1>Train Data</h1>
            {/* {data.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Train Number</th>
                            <th>Train Name</th>
                            <th>Source</th>
                            <th>Destination</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((train, index) => (
                            <tr key={index}>
                                <td>{train.number}</td>
                                <td>{train.name}</td>
                                <td>{train.src}</td>
                                <td>{train.dst}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> */}
            {/* )} */}
        </div>
    );
};

export default TrainData;
