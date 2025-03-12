import React from 'react';
import { Link } from 'react-router-dom';

const DonationConfirmation = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Donation Confirmation</h1>
            <p style={styles.text}>Thank you for your donation! Your food will be picked up on the scheduled date.</p>
            <Link to="/dashboard">
                <button style={styles.button}>Back to Dashboard</button>
            </Link>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
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
    },
};

export default DonationConfirmation;
