const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../config/db');

// Get donatee profile
router.get('/profile', auth, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT name, email, address FROM donatees WHERE id = ?',
      [req.user.id]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get donatee's donations
router.get('/donations', auth, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM donation_requests WHERE donatee_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit donation request
router.post('/request', auth, async (req, res) => {
  const { itemName, quantity, urgency, description } = req.body;
  try {
    await db.query(
      'INSERT INTO donation_requests (donatee_id, item_name, quantity, urgency, description, status) VALUES (?, ?, ?, ?, ?, "pending")',
      [req.user.id, itemName, quantity, urgency, description]
    );
    res.json({ message: 'Request submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
