// src/app/models/task.model.ts

export interface Task {
    /** מזהה של Mongo (_id) */
    _id: string;

    /** כותרת המשימה (חובה) */
    title: string;

    /** סטטוס השלמה (false כברירת מחדל) */
    completed: boolean;

    /** מי “נעל”” את המשימה (ObjectId של User) או null */
    lockedBy: string | null;

    /** תאריך יצירה שנוצר אוטומטית */
    createdAt: Date;

    /** תאריך עדכון אחרון שנוצר אוטומטית */
    updatedAt: Date;
}
