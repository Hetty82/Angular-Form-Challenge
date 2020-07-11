import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SignUpFormData } from '../models/sign-up.model';

@Component({
    selector: 'app-sign-up-form',
    templateUrl: './sign-up-form.component.html',
    styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent implements OnInit {
    @Input() form: FormGroup;

    @Output() formSubmit = new EventEmitter<SignUpFormData>();

    constructor() {}

    ngOnInit(): void {}
}
