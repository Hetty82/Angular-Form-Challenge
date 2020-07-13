import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpData } from '../models/sign-up.model';

@Injectable({
    providedIn: 'root',
})
export class SignUpService {
    constructor(private http: HttpClient) {}

    signUp$(data: SignUpData) {
        // For testing the error scenario:
        // const url = 'error!';
        const url = 'https://demo-api.now.sh/users';

        return this.http.post(url, data);
    }
}
