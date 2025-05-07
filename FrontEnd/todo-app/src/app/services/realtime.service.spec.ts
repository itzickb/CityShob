import { TestBed } from '@angular/core/testing';
import { RealtimeService } from './realtime.service';
import { environment } from '../../environments/environment';

describe('RealtimeService', () => {
    let service: RealtimeService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RealtimeService);
    });

    afterEach(() => {
        service.disconnect();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should connect to the correct URL', () => {
        // @ts-ignore – ניגשת לשדה פרטי לצורך בדיקה
        expect((service as any).socket.io.uri).toBe(environment.socketUrl);
    });
});
