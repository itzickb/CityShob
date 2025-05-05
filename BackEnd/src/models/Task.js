// models/Task.js
const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,        // חובה להגדיר כותרת
        trim: true             // מסיר רווחים מיותרים בתחילת/סוף המחרוזת
    },
    completed: {
        type: Boolean,
        default: false         // כשלח task חדש, הוא לא מסומן כ־completed
    },
    lockedBy: {
        type: Types.ObjectId,  // נשמר ref ל־User או כל entity אחר
        ref: 'User',           // אם תרצה, תגדיר כאן את השם של המודל עליו מתבסס
        default: null          // אם אף אחד לא “נעל” את המשימה
    }
}, {
    timestamps: true         // יוסיף createdAt ו-updatedAt אוטומטית
});

module.exports = model('Task', taskSchema);
