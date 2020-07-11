import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { SignUpData } from '../models/sign-up.model';
import { SignUpService } from '../services/sign-up.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
    public form: FormGroup;

    constructor(private signUpService: SignUpService, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.buildForm();
    }

    public signUp({ firstName, lastName, email }: SignUpData) {
        // todo: add submit feedback
        this.signUpService.signUp$({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
        });
    }

    private buildForm() {
        this.form = this.fb.group(
            {
                firstName: [null, Validators.required],
                lastName: [null, Validators.required],
                email: [null, [Validators.required, Validators.email]],
                password: [
                    null,
                    [
                        // 1. Password Field is Required
                        Validators.required,
                        // 2. Has a minimum length of 8 characters
                        Validators.minLength(8),
                        // 3. check whether the entered password has upper case letter
                        this.createPatternValidator(/[A-Z]/, { hasCapitalCase: true }),
                        // 4. check whether the entered password has a lower-case letter
                        this.createPatternValidator(/[a-z]/, { hasLowerCase: true }),
                    ],
                ],
                passwordConfirmation: [null, Validators.required],
            },
            {
                validators: [
                    this.validatePasswordConfirmation,
                    this.validateNoFirstNameInPassword,
                    this.validatNoLastNameInPassword,
                ],
            },
        );
    }

    // This was inspired here:
    // https://codinglatte.com/posts/angular/cool-password-validation-angular/
    private createPatternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            const valid = regex.test(control.value);

            return valid ? null : error;
        };
    }

    private validatePasswordConfirmation(group: FormGroup) {
        const password = group.get('password').value;
        const confirmation = group.get('passwordConfirmation').value;

        return password === confirmation ? null : { notSame: true };
    }

    private validateNoFirstNameInPassword(group: FormGroup) {
        const firstNameControlValue: string = group.get('firstName').value;
        if (!firstNameControlValue) {
            return null;
        }
        const password = group.get('password').value;

        const firstNames = firstNameControlValue.trim().split(' ');
        const invalid = firstNames.some((name) => {
            const regex = new RegExp(name, 'i');
            return regex.test(password);
        });

        return invalid ? { noFirstNameInPassword: true } : null;
    }

    private validatNoLastNameInPassword(group: FormGroup) {
        const lastNameControlValue: string = group.get('lastName').value;
        if (!lastNameControlValue) {
            return null;
        }
        const password: string = group.get('password').value;

        const lastNames = lastNameControlValue.trim().split(' ');
        const invalid = lastNames.some((name) => {
            const regex = new RegExp(name, 'i');
            return regex.test(password);
        });

        return invalid ? { noLastNameInPassword: true } : null;
    }
}
