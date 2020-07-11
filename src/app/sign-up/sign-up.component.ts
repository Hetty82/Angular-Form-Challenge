import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SignUpData } from '../models/sign-up.model';
import { SignUpService } from '../services/sign-up.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
    public form: FormGroup;

    constructor(private signUpService: SignUpService) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            firstName: new FormControl(''),
            lastName: new FormControl(''),
            email: new FormControl(''),
            password: new FormControl(''),
            passwordConfirmation: new FormControl(''),
        });
    }

    public signUp({ firstName, lastName, email }: SignUpData) {
        // todo: add submit feedback
        this.signUpService.signUp$({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
        });
    }
}
