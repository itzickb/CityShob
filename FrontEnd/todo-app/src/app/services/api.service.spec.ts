import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Task } from '../models/task.model';
import { environment } from '../../environments/environment';

describe('ApiService', () => {
    let service: ApiService;
    let httpMock: HttpTestingController;
    const baseUrl = environment.apiUrl + '/tasks';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ApiService]
        });

        service = TestBed.inject(ApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        // וודא שלא נותרו קריאות פתוחות
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getTasks() should return an array of Tasks', () => {
        const dummyTasks: Task[] = [
            { _id: '1', title: 'T1', completed: false, lockedBy: null, createdAt: new Date(), updatedAt: new Date() },
            { _id: '2', title: 'T2', completed: true, lockedBy: 'user1', createdAt: new Date(), updatedAt: new Date() }
        ];

        service.getTasks().subscribe(tasks => {
            expect(tasks.length).toBe(2);
            expect(tasks).toEqual(dummyTasks);
        });

        const req = httpMock.expectOne(baseUrl);
        expect(req.request.method).toBe('GET');
        req.flush(dummyTasks);
    });

    it('getTaskById() should return a single Task', () => {
        const dummy: Task = { _id: '1', title: 'Only', completed: false, lockedBy: null, createdAt: new Date(), updatedAt: new Date() };

        service.getTaskById('1').subscribe(task => {
            expect(task).toEqual(dummy);
        });

        const req = httpMock.expectOne(`${baseUrl}/1`);
        expect(req.request.method).toBe('GET');
        req.flush(dummy);
    });

    it('createTask() should POST and return the new Task', () => {
        const newTask: Partial<Task> = { title: 'New' };
        const returned: Task = { _id: '3', title: 'New', completed: false, lockedBy: null, createdAt: new Date(), updatedAt: new Date() };

        service.createTask(newTask).subscribe(task => {
            expect(task).toEqual(returned);
        });

        const req = httpMock.expectOne(baseUrl);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toBe(JSON.stringify(newTask));
        req.flush(returned);
    });

    it('updateTask() should PATCH and return the updated Task', () => {
        const updates: Partial<Task> = { completed: true };
        const returned: Task = { _id: '1', title: 'T1', completed: true, lockedBy: null, createdAt: new Date(), updatedAt: new Date() };

        service.updateTask('1', updates).subscribe(task => {
            expect(task).toEqual(returned);
        });

        const req = httpMock.expectOne(`${baseUrl}/1`);
        expect(req.request.method).toBe('PATCH');
        expect(req.request.body).toBe(JSON.stringify(updates));
        req.flush(returned);
    });

    it('deleteTask() should DELETE the Task', () => {
        service.deleteTask('1').subscribe(res => {
            expect(res).toBeUndefined();
        });

        const req = httpMock.expectOne(`${baseUrl}/1`);
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });
});
