import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FoodService from '../services/FoodService';
import ScheduleService from '../services/ScheduleService';

const Dashboard = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        FoodService.getFoodItems().then(response => {
            setFoodItems(response.data);
        });
        ScheduleService.getSchedules().then(response => {
            setSchedules(response.data);
        });
    }, []);

    return (
        <div style={styles.dashboardContainer}>
            <h1 style={styles.header}>Dashboard</h1>
            <div style={styles.section}>
                <h2>Food Items</h2>
                <ul style={styles.list}>
                    {foodItems.map(item => (
                        <li key={item.id} style={styles.listItem}>{item.name}</li>
                    ))}
                </ul>
            </div>

            <div style={styles.section}>
                <h2>Pickup Schedules</h2>
                <ul style={styles.list}>
                    {schedules.map(schedule => (
                        <li key={schedule.id} style={styles.listItem}>
                            {schedule.pickupDate} at {schedule.pickupTime} - Status: {schedule.status}
                        </li>
                    ))}
                </ul>
            </div>

            <Link to="/donation-form">
                <button style={styles.button}>Make a Donation</button>
            </Link>
        </div>
    );
};

const styles = {
    dashboardContainer: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        fontSize: '32px',
        marginBottom: '20px',
    },
    section: {
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
    button: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        textAlign: 'center',
    },
};

export default Dashboard;
