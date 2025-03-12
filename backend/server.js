const express = require('express');
const cors = require('cors');
const donateeRoutes = require('./routes/donateeRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/donatee', donateeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
