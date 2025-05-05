// controllers/TaskController.js
const express = require('express');
const TaskRepository = require('../repositories/TaskRepository');

const router = express.Router();

// GET /tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await TaskRepository.findAll();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'שגיאה בשרת במהלך הבאת המשימות' });
    }
});

// GET /tasks/:id
router.get('/:id', async (req, res) => {
    try {
        const task = await TaskRepository.findById(req.params.id);
        if (!task) return res.status(404).json({ error: 'משימה לא נמצאה' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: 'שגיאה בשרת במהלך הבאת המשימה' });
    }
});

// POST /tasks
router.post('/', async (req, res) => {
    try {
        const { title, completed, lockedBy } = req.body;
        if (!title) return res.status(400).json({ error: 'title הינו שדה חובה' });

        const newTask = await TaskRepository.create({ title, completed, lockedBy });
        // שידור לאירוע taskCreated
        req.app.get('io').emit('taskCreated', newTask);

        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: 'שגיאה בשרת במהלך יצירת המשימה' });
    }
});

// PUT /tasks/:id
router.put('/:id', async (req, res) => {
    try {
        const updates = req.body;
        const updatedTask = await TaskRepository.update(req.params.id, updates);
        if (!updatedTask) return res.status(404).json({ error: 'משימה לא נמצאה לעדכון' });

        // שידור לאירוע taskUpdated
        req.app.get('io').emit('taskUpdated', updatedTask);

        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: 'שגיאה בשרת במהלך עדכון המשימה' });
    }
});

// DELETE /tasks/:id
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await TaskRepository.delete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'משימה לא נמצאה למחיקה' });

        // שידור לאירוע taskDeleted (ניתן לשלוח רק את ה־id)
        req.app.get('io').emit('taskDeleted', { id: req.params.id });

        res.json({ message: 'המשימה נמחקה בהצלחה' });
    } catch (err) {
        res.status(500).json({ error: 'שגיאה בשרת במהלך מחיקת המשימה' });
    }
});

module.exports = router;
