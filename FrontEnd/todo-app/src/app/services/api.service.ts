import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly baseUrl = environment.apiUrl;  // למשל 'http://localhost:3000/api'
    private jsonHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private http: HttpClient) { }

    /** קבלת כל המשימות */
    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
    }

    /** קבלת משימה לפי מזהה */
    getTaskById(id: string): Observable<Task> {
        return this.http.get<Task>(`${this.baseUrl}/tasks/${id}`);
    }

    /** יצירת משימה חדשה */
    createTask(task: Partial<Task>): Observable<Task> {
        return this.http.post<Task>(
            `${this.baseUrl}/tasks`,
            JSON.stringify(task),
            { headers: this.jsonHeaders }
        );
    }

    /** עדכון חלקי של משימה קיימת */
    updateTask(id: string, updates: Partial<Task>): Observable<Task> {
        return this.http.patch<Task>(
            `${this.baseUrl}/tasks/${id}`,
            JSON.stringify(updates),
            { headers: this.jsonHeaders }
        );
    }

    /** מחיקת משימה */
    deleteTask(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/tasks/${id}`);
    }
}
