import React, { useState } from 'react';
import FoodService from '../services/FoodService';
import { useHistory } from 'react-router-dom';

const DonationForm = () => {
    const [foodName, setFoodName] = useState('');
    const [quantity, setQuantity] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const foodItem = { name: foodName, quantity };

        FoodService.addFoodItem(foodItem)
            .then(() => {
                history.push('/donation-confirmation');
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    };

    return (
        <div style={styles.formContainer}>
            <h1 style={styles.header}>Donate Food</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Food Name: </label>
                    <input
                        type="text"
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Quantity: </label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Donate</button>
            </form>
        </div>
    );
};

const styles = {
    formContainer: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        fontSize: '32px',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        fontSize: '18px',
        marginBottom: '8px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        width: '300px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
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

export default DonationForm;
