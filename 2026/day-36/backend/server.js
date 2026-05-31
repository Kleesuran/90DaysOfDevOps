const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/devops_tasks';

// Middleware
app.use(cors());
app.use(express.json());

// Task Schema & Model
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);

// Connection logic with retry
const connectWithRetry = () => {
  console.log('Attempting MongoDB connection...');
  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('Successfully connected to MongoDB!');
    })
    .catch((err) => {
      console.error('MongoDB connection failure, retrying in 5 seconds...', err.message);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// API Routes
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const newTask = new Task({ title, description });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mock DevOps System Health endpoint
app.get('/api/system-status', (req, res) => {
  // Generate slightly fluctuating mock metrics
  const uptime = Math.floor(process.uptime());
  const cpuLoad = (Math.random() * 20 + 5).toFixed(1); // 5% - 25%
  const memoryUsed = (Math.random() * 15 + 40).toFixed(1); // 40% - 55%
  const diskUsed = 31.4; // Fixed matching klee's fastfetch / health_report! Very personalized!
  
  res.json({
    status: 'Healthy',
    uptime: `${uptime}s`,
    metrics: {
      cpu: `${cpuLoad}%`,
      memory: `${memoryUsed}%`,
      disk: `${diskUsed}%`
    },
    platform: process.platform,
    nodeVersion: process.version
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
