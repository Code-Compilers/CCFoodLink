import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Welcome to the Code Compilers Food Link</h1>
            <p style={styles.text}>Help reduce food waste by donating your unused food to those in need.</p>
            <p style={styles.text}>Please donate food so that no one sleeps on a hungry stomach</p>
            <div>
                <Link to="/login" style={styles.link}>
                    <button style={styles.button}>Login</button>
                </Link>
                <Link to="/register" style={styles.link}>
                    <button style={styles.button}>Register</button>
                </Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
    },
    header: {
        fontSize: '32px',
        marginBottom: '20px',
    },
    text: {
        fontSize: '20px',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '10px',
    },
    link: {
        textDecoration: 'none',
    },
};

export default HomePage;
