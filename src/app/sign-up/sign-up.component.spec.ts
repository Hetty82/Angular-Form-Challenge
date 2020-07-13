import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockComponent, ngMocks } from 'ng-mocks';
import { of, throwError } from 'rxjs';
import { Feedback } from '../models/sign-up.model';
import { SignUpService } from '../services/sign-up.service';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
    // I don't like beforeEach, I occassionally use it for mocking functions, but for setting up the
    // test I strongly prefer a custom arrange function like this. It allows for passing arguments
    // from your tests and keeps it clear what is happening when.

    const arrange = (overrides: any = {}) => {
        const stub = {
            signUpService: {
                signUp$: jest.fn(() => of()),
            },
            ...overrides,
        };

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [SignUpComponent, MockComponent(SignUpFormComponent)],
            providers: [{ provide: SignUpService, useValue: stub.signUpService }],
            schemas: [NO_ERRORS_SCHEMA],
        });

        const fixture = TestBed.createComponent(SignUpComponent);
        const component = fixture.componentInstance;
        const child = ngMocks.find<SignUpFormComponent>(fixture.debugElement, 'app-sign-up-form')
            .componentInstance;

        fixture.detectChanges();

        return { stub, fixture, component, child };
    };

    // I'm not testing the password confirmation since it was not reuiqred and I am running out
    // of time 😛

    describe('form', () => {
        test('builds a sign up form with the correct controls', () => {
            // Arrange
            const { component } = arrange();

            // Assert
            expect(component.form.controls.firstName).toBeTruthy();
            expect(component.form.controls.lastName).toBeTruthy();
            expect(component.form.controls.email).toBeTruthy();
            expect(component.form.controls.password).toBeTruthy();
        });

        test('first name is required', () => {
            // Arrange
            const { component } = arrange();
            const firstNameControl = component.form.get('firstName');
            firstNameControl.setValue('');

            // Assert initial
            expect(firstNameControl.getError('required')).toBe(true);

            // Act initial
            firstNameControl.setValue('abc');

            // Assert initial
            expect(firstNameControl.getError('required')).toBeFalsy();
        });

        test('last name is required', () => {
            // Arrange
            const { component } = arrange();
            const lastNameControl = component.form.get('lastName');
            lastNameControl.setValue('');

            // Assert initial
            expect(lastNameControl.getError('required')).toBe(true);

            // Act
            lastNameControl.setValue('abc');

            // Assert
            expect(lastNameControl.getError('required')).toBeFalsy();
        });

        test('email is required', () => {
            // Arrange
            const { component } = arrange();
            const emailControl = component.form.get('email');
            emailControl.setValue('');

            // Assert initial
            expect(emailControl.getError('required')).toBe(true);

            // Act
            emailControl.setValue('abc');

            // Assert
            expect(emailControl.getError('required')).toBeFalsy();
        });

        test('email is a valid email format', () => {
            // Arrange
            const { component } = arrange();
            const emailControl = component.form.get('email');
            emailControl.setValue('abc');

            // Assert initial
            expect(emailControl.getError('email')).toBe(true);

            // Act
            emailControl.setValue('abc@efg');

            // Assert
            expect(emailControl.getError('email')).toBeFalsy();
        });

        test('password is required', () => {
            // Arrange
            const { component } = arrange();
            const passwordControl = component.form.get('password');
            passwordControl.setValue('');

            // Assert initial
            expect(passwordControl.getError('required')).toBe(true);

            // Act
            passwordControl.setValue('abc');

            // Assert
            expect(passwordControl.getError('required')).toBeFalsy();
        });

        test('password has a minimum length of 8 charactars', () => {
            // Arrange
            const { component } = arrange();
            const passwordControl = component.form.get('password');
            passwordControl.setValue('abc');

            // Assert initial
            expect(passwordControl.getError('minlength')).toBeTruthy();

            // Act
            passwordControl.setValue('abcdefgh');

            // Assert
            expect(passwordControl.getError('minlength')).toBeFalsy();
        });

        test('password contains a capital case letter', () => {
            // Arrange
            const { component } = arrange();
            const passwordControl = component.form.get('password');
            passwordControl.setValue('abc');

            // Assert initial
            expect(passwordControl.getError('hasCapitalCase')).toBeTruthy();

            // Act
            passwordControl.setValue('aBc');

            // Assert
            expect(passwordControl.getError('hasCapitalCase')).toBeFalsy();
        });

        test('password contains a lower case letter', () => {
            // Arrange
            const { component } = arrange();
            const passwordControl = component.form.get('password');
            passwordControl.setValue('ABC');

            // Assert
            expect(passwordControl.getError('hasLowerCase')).toBeTruthy();

            // Act
            passwordControl.setValue('AbC');

            // Assert
            expect(passwordControl.getError('hasLowerCase')).toBeFalsy();
        });

        test('password does not contain the first name', () => {
            // Arrange
            const { component } = arrange();
            const firstNameControl = component.form.get('firstName');
            const passwordControl = component.form.get('password');

            firstNameControl.setValue('Leia');
            passwordControl.setValue('abcleiaefg');

            // Assert initial
            expect(component.form.getError('noFirstNameInPassword')).toBeTruthy();

            // Act
            passwordControl.setValue('abcdefg');

            // Assert
            expect(component.form.getError('noFirstNameInPassword')).toBeFalsy();
        });

        test('password does not contain the last name', () => {
            // Arrange
            const { component } = arrange();
            const lastNameControl = component.form.get('lastName');
            const passwordControl = component.form.get('password');

            lastNameControl.setValue('Organa');
            passwordControl.setValue('abcORgANaefg');

            // Assert initial
            expect(component.form.getError('noLastNameInPassword')).toBeTruthy();

            // Act
            passwordControl.setValue('abcSkywalkerefg');

            // Assert
            expect(component.form.getError('noLastNameInPassword')).toBeFalsy();
        });

        test('passes the form to the child', () => {
            // Arrange
            const { component, child } = arrange();

            // Assert
            expect(component.form).toEqual(child.form);
            expect(child.form).toBeTruthy();
        });

        test('passes the submitted data from the child to the SignUpService', () => {
            // Arrange
            const { child, stub } = arrange();
            const formValue = {
                firstName: 'Leia',
                lastName: 'Organa',
                email: 'leia@therebels.org',
                password: 'I am your father',
                passwordConfirmation: 'I am your father',
            };

            // Assert initial
            expect(stub.signUpService.signUp$).not.toBeCalled();

            // Act
            child.formSubmit.emit(formValue);

            // Assert
            const expected = { email: 'leia@therebels.org', firstName: 'Leia', lastName: 'Organa' };
            expect(stub.signUpService.signUp$).toBeCalledWith(expected);
        });
    });

    describe('feedback', () => {
        const formValue = {
            firstName: 'Leia',
            lastName: 'Organa',
            email: 'leia@therebels.org',
            password: 'I am your father',
            passwordConfirmation: 'I am your father',
        };

        test('sets success feedback on signup success', () => {
            // Arrange
            const { fixture, component, child } = arrange({
                // Technically this override is not required (the default is a successful emit).
                // However I explicitely setup the case here again, so it's not coupled with
                // the default and I believe it's more clear.
                signUpService: {
                    signUp$: jest.fn(() => of('Success!')),
                },
            });
            const expected: Feedback = {
                type: 'success',
                message: expect.any(String),
            };

            // Assert initial
            expect(child.feedback).toBeFalsy();

            // Act
            component.signUp(formValue);
            fixture.detectChanges();

            // Assert
            expect(component.feedback).toEqual(expected);
            expect(child.feedback).toEqual(expected);
        });

        test('sets error feedback on signup error', () => {
            // Arrange
            const { fixture, component, child } = arrange({
                signUpService: {
                    signUp$: jest.fn(() => throwError('error!')),
                },
            });
            const expected: Feedback = {
                type: 'error',
                message: expect.any(String),
            };
            const realConsoleError = console.error;
            console.error = jest.fn();

            // Assert initial
            expect(child.feedback).toBeFalsy();

            // Act
            component.signUp(formValue);
            fixture.detectChanges();

            // Assert
            expect(child.feedback).toEqual(expected);
            expect(console.error).toBeCalledWith('Posting failed:', 'error!');

            // Cleanup
            console.error = realConsoleError;
        });

        test('resets the feedback on formReset from child', () => {
            // Arrange
            const { fixture, component, child } = arrange();
            const feedback: Feedback = {
                type: 'success',
                message: 'Yeah 🎉',
            };
            component.feedback = feedback;
            fixture.detectChanges();

            // Assert initial
            expect(child.feedback).toBe(feedback);

            // Act
            child.formReset.emit();
            fixture.detectChanges();

            // Assert
            expect(child.feedback).toBeFalsy();
        });
    });
});
