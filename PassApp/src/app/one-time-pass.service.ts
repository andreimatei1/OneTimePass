import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class OneTimePassService {

    constructor(
        private http: HttpClient
    ) { }

    getOneTimePass(userId: string): Observable<any> {
        return this.http.get(`https://localhost:44319/pass?userId=${userId}`);
    }

    remainingSecondsForOneTimePass(userId: string, otp: string): Observable<any> {
        return this.http.get(`https://localhost:44319/pass/remaining?userId=${userId}&totpCode=${otp}`);
    }
}