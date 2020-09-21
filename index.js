const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')
const Task = require('./models/task')

const app = express()
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './task-list.db' })
const tasks = Task(sequelize, DataTypes)

// We need to parse JSON coming from requests
app.use(express.json())

// List tasks
app.get('/tasks', async(req, res) => {
  const storage = await tasks.findAll();
  res.json({ storage });
});

// Create task
app.post('/tasks', async(req, res) => {
  const body = req.body;

  await tasks.create({
    description: body.description,
    createdAt: body.createdAt
  });

  res.json({ result: "New task", taskId: taskId });
});

// Show task
app.get('/tasks/:id', async(req, res) => {
  const taskId = req.params.id;
  const task = await tasks.findByPk(id);

  res.send({ action: 'Showing task', taskId: taskId });
});

// Update task
app.put('/tasks/:id', async(req, res) => {
  const body = req.body;
  const taskId = req.params.id
  const task = await tasks.findByPk(id);

  res.send({ action: 'Updating task', taskId: taskId })
});

// Delete task
app.delete('/tasks/:id', async(req, res) => {
  const taskId = req.params.id
  await tasks.destroy({ where: {id: 2 } });

  res.send({ action: 'Deleting task', taskId: taskId });
});

app.listen(3000, () => {
  console.log('Server running')
});
