import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MatPaginatorModule } from '@angular/material/paginator';

@Injectable({
    providedIn: 'root'
})
export class RealtimeService implements OnDestroy {
    private socket: Socket;

    constructor() {
        this.socket = io(environment.socketUrl, {
            transports: ['websocket'],
            withCredentials: true
        });
    }

    /**
     * מאזין לאירוע מסוים מהשרת
     * ומחזיר Observable שמנפיק כל פעם שמגיע data
     */
    on<T>(eventName: string): Observable<T> {
        return new Observable(observer => {
            const handler = (data: T) => observer.next(data);
            this.socket.on(eventName, handler);
            return () => this.socket.off(eventName, handler);
        });
    }

    /** שולח אירוע לשרת עם payload אופציונלי */
    emit(eventName: string, payload?: any): void {
        this.socket.emit(eventName, payload);
    }

    /** מנתק את החיבור */
    disconnect(): void {
        this.socket.disconnect();
    }

    ngOnDestroy(): void {
        this.disconnect();
    }
}
