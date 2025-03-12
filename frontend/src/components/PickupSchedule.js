import React, { useState, useEffect } from 'react';
import ScheduleService from '../services/ScheduleService';

const PickupSchedule = () => {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        ScheduleService.getSchedules().then(response => {
            setSchedules(response.data);
        });
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Pickup Schedule</h1>
            <ul style={styles.list}>
                {schedules.map(schedule => (
                    <li key={schedule.id} style={styles.listItem}>
                        {schedule.pickupDate} at {schedule.pickupTime} - Status: {schedule.status}
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

export default PickupSchedule;
