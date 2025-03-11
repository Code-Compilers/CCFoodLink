import React, { useState, useEffect } from 'react';
import FoodService from '../services/FoodService';

const FoodList = () => {
    const [foodItems, setFoodItems] = useState([]);

    useEffect(() => {
        FoodService.getFoodItems().then(response => {
            setFoodItems(response.data);
        });
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Food List</h1>
            <ul style={styles.list}>
                {foodItems.map(item => (
                    <li key={item.id} style={styles.listItem}>
                        {item.name} - Quantity: {item.quantity}
                    </li>
                ))}
            </ul>
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
    list: {
        listStyleType: 'none',
        paddingLeft: '0',
    },
    listItem: {
        fontSize: '18px',
        marginBottom: '10px',
    },
};

export default FoodList;
