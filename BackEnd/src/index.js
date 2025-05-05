// index.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

const TaskController = require('./controllers/TaskController');

const app = express();
app.use(cors());
app.use(express.json());

// יצירת שרת HTTP כדי שנוכל לצרף אליו את Socket.IO
const server = http.createServer(app);

// אתחול Socket.IO עם CORS פתוח
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});
// שמירה של האובייקט io ב-app כדי שנוכל לגשת אליו מכל מקום
app.set('io', io);

// 1. חיבור ל־MongoDB עם then/catch
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ התחברנו ל-MongoDB בהצלחה'))
    .catch(err => {
        console.error('❌ כשל בחיבור ל-MongoDB:', err);
        process.exit(1); // אפשר לצאת מהתהליך אם החיבור קריטי
    });

// 2. האזנה לאירועי חיבור/שגיאה נוספים על הממשק
const db = mongoose.connection;
db.on('error', err => console.error('🔴 MongoDB connection error:', err));
db.once('open', () => console.log('🟢 MongoDB connection open'));


// התחברות אירועית של Socket.IO
io.on('connection', socket => {
    console.log(`🔌 Socket connected: ${socket.id}`);

    // לקוח מבקש לנעול משימה
    socket.on('lock-task', async ({ taskId, userId }) => {
        const TaskRepository = require('./repositories/TaskRepository');
        try {
            const locked = await TaskRepository.update(taskId, { lockedBy: userId });
            // משדר לכל הלקוחות
            io.emit('taskLocked', locked);
        } catch (err) {
            socket.emit('error', { message: 'לא הצלחנו לנעול את המשימה' });
        }
    });

    // לקוח מבקש לשחרר נעילה
    socket.on('unlock-task', async ({ taskId }) => {
        const TaskRepository = require('./repositories/TaskRepository');
        try {
            const unlocked = await TaskRepository.update(taskId, { lockedBy: null });
            io.emit('taskUnlocked', unlocked);
        } catch (err) {
            socket.emit('error', { message: 'לא הצלחנו לשחרר את הנעילה' });
        }
    });

    socket.on('disconnect', () => {
        console.log(`⚡ Socket disconnected: ${socket.id}`);
    });
});

// ניתוב ה-API
app.use('/tasks', TaskController);

// הרצת השרת
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 השרת רץ על פורט ${PORT}`);
});
