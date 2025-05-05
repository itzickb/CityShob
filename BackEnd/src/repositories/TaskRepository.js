// repositories/TaskRepository.js

const Task = require('../models/Task');

class TaskRepository {
    /**
     * יוצר משימה חדשה
     * @param {{ title: string, completed?: boolean, lockedBy?: ObjectId }} data
     * @returns {Promise<Task>}
     */
    static async create(data) {
        const task = new Task({
            title: data.title,
            completed: data.completed ?? false,
            lockedBy: data.lockedBy ?? null
        });
        return task.save();
    }

    /**
     * מחזיר את כל המשימות
     * @returns {Promise<Task[]>}
     */
    static async findAll() {
        return Task.find().sort({ createdAt: -1 }).exec();
    }

    /**
     * מחזיר משימה לפי מזהה
     * @param {string} id
     * @returns {Promise<Task|null>}
     */
    static async findById(id) {
        return Task.findById(id).exec();
    }

    /**
     * מעדכן משימה לפי מזהה
     * @param {string} id
     * @param {{ title?: string, completed?: boolean, lockedBy?: ObjectId|null }} data
     * @returns {Promise<Task|null>}
     */
    static async update(id, data) {
        return Task.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true, runValidators: true }
        ).exec();
    }

    /**
     * מוחק משימה לפי מזהה
     * @param {string} id
     * @returns {Promise<Task|null>}
     */
    static async delete(id) {
        return Task.findByIdAndDelete(id).exec();
    }
}

module.exports = TaskRepository;
