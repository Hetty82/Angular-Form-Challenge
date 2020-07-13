import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Feedback, SignUpFormData } from '../models/sign-up.model';

@Component({
    selector: 'app-sign-up-form',
    templateUrl: './sign-up-form.component.html',
    styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() feedback: Feedback;

    @Output() formSubmit = new EventEmitter<SignUpFormData>();
    @Output() formReset = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}

    // I don't like getters. They hide that they are functions, called on each change detection
    // cycle. However these are very light, and therefor acceptable. And I wanted to show you I
    // know I can use getters.

    public get firstName() {
        return this.form.get('firstName');
    }
    public get lastName() {
        return this.form.get('lastName');
    }
    public get email() {
        return this.form.get('email');
    }
    public get password() {
        return this.form.get('password');
    }
    public get passwordConfirmation() {
        return this.form.get('passwordConfirmation');
    }
}
