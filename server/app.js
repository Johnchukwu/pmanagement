const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv =require('dotenv');
const authRoutes = require('./routes/auth');
const inventoryRoutes = require('./routes/inventory');
const salesRoutes = require('./routes/sales');
const feedbackRoutes = require('./routes/feedback');
const reorderRoutes = require('./routes/reorder');
const notificationsRoutes = require('./routes/notifications');
const errorHandler = require('./middleware/errorHandler');

const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.use(errorHandler);

app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/reorders', reorderRoutes);
app.use('/api/notifications', notificationsRoutes);

const PORT = process.env.PORT || 3350;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
