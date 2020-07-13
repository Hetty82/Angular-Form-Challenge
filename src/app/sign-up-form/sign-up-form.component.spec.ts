import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SignUpFormComponent } from './sign-up-form.component';

describe('SignUpFormComponent', () => {
    const arrange = (overrides: any = {}) => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [SignUpFormComponent],
            schemas: [NO_ERRORS_SCHEMA],
        });

        const fixture = TestBed.createComponent(SignUpFormComponent);
        const component = fixture.componentInstance;
        component.form = new FormGroup({
            firstName: new FormControl(''),
            lastName: new FormControl(''),
            email: new FormControl(''),
            password: new FormControl(''),
            passwordConfirmation: new FormControl(''),
        });

        fixture.detectChanges();

        return { fixture, component };
    };

    // I ended up using most of these only once, but I'll leave them here to show how I'd add
    // element helpers when needed
    const getForm = (debugElement: DebugElement): HTMLFormElement =>
        debugElement.query(By.css('form')).nativeElement;

    const getFirstNameInput = (debugElement: DebugElement): HTMLInputElement =>
        debugElement.query(By.css('input.first-name')).nativeElement;

    const getLastNameInput = (debugElement: DebugElement): HTMLInputElement =>
        debugElement.query(By.css('input.last-name')).nativeElement;

    const getEmailInput = (debugElement: DebugElement): HTMLInputElement =>
        debugElement.query(By.css('input.email')).nativeElement;

    const getPasswordInput = (debugElement: DebugElement): HTMLInputElement =>
        debugElement.query(By.css('input.password')).nativeElement;

    const getPasswordErrors = (debugElement: DebugElement): HTMLInputElement =>
        debugElement.query(By.css('.hints.password.errors')).nativeElement;

    const getPasswordConfirmationInput = (debugElement: DebugElement): HTMLInputElement =>
        debugElement.query(By.css('input.password-confirmation')).nativeElement;

    describe('first name', () => {
        test('shows a label', () => {
            // Arrange
            const { fixture } = arrange();
            const labelDe = fixture.debugElement.query(By.css('label.first-name'));
            const labelEl: HTMLLabelElement = labelDe.nativeElement;

            // Assert
            expect(labelEl.textContent).toContain('First name');
        });

        test('shows an input that is connected to the form', () => {
            // Arrange
            const { fixture, component } = arrange();
            const firstNameControl = component.form.get('firstName');
            const firstNameEl = getFirstNameInput(fixture.debugElement);

            // Assert initial
            expect(firstNameEl.value).toBeFalsy();
            expect(firstNameControl.value).toBeFalsy();

            // Act
            firstNameEl.value = 'Leia';
            firstNameEl.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            // Assert
            expect(firstNameEl.value).toBe('Leia');
            expect(firstNameControl.value).toBe('Leia');
        });

        test('shows a hint when it has a required error and is touched', () => {
            // Arrange
            const { fixture, component } = arrange();
            const firstNameControl = component.form.get('firstName');
            const formEl = getForm(fixture.debugElement);

            const expected = 'First name is required';

            // Assert initial
            expect(formEl.textContent).not.toContain(expected);

            // Act
            firstNameControl.setErrors({ required: true });
            firstNameControl.markAsTouched();
            fixture.detectChanges();

            // Assert
            expect(formEl.textContent).toContain(expected);
        });
    });

    describe('last name', () => {
        test('shows a label', () => {
            // Arrange
            const { fixture } = arrange();
            const labelDe = fixture.debugElement.query(By.css('label.last-name'));
            const labelEl: HTMLLabelElement = labelDe.nativeElement;

            // Assert
            expect(labelEl.textContent).toContain('Last name');
        });

        test('shows an input that is connected to the form', () => {
            // Arrange
            const { fixture, component } = arrange();
            const lastNameControl = component.form.get('lastName');
            const lastNameEl = getLastNameInput(fixture.debugElement);

            // Assert initial
            expect(lastNameEl.value).toBeFalsy();
            expect(lastNameControl.value).toBeFalsy();

            // Act
            lastNameEl.value = 'Organa';
            lastNameEl.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            // Assert
            expect(lastNameEl.value).toBe('Organa');
            expect(lastNameControl.value).toBe('Organa');
        });

        test('shows a hint when it has a required error and is touched', () => {
            // Arrange
            const { fixture, component } = arrange();
            const lastNameControl = component.form.get('lastName');
            const formEl = getForm(fixture.debugElement);

            const expected = 'Last name is required';

            // Assert initial
            expect(formEl.textContent).not.toContain(expected);

            // Act
            lastNameControl.setErrors({ required: true });
            lastNameControl.markAsTouched();
            fixture.detectChanges();

            // Assert
            expect(formEl.textContent).toContain(expected);
        });
    });

    describe('email', () => {
        test('shows a label', () => {
            // Arrange
            const { fixture } = arrange();
            const labelDe = fixture.debugElement.query(By.css('label.email'));
            const labelEl: HTMLLabelElement = labelDe.nativeElement;

            // Assert
            expect(labelEl.textContent).toContain('Email');
        });

        test('shows an input that is connected to the form', () => {
            // Arrange
            const { fixture, component } = arrange();
            const emailControl = component.form.get('email');
            const emailEl = getEmailInput(fixture.debugElement);

            // Assert initial
            expect(emailEl.value).toBeFalsy();
            expect(emailControl.value).toBeFalsy();

            // Act
            emailEl.value = 'abc';
            emailEl.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            // Assert
            expect(emailEl.value).toBe('abc');
            expect(emailControl.value).toBe('abc');
        });

        test('shows a hint when it has a required error and is touched', () => {
            // Arrange
            const { fixture, component } = arrange();
            const emailControl = component.form.get('email');
            const formEl = getForm(fixture.debugElement);

            const expected = 'Email is required';

            // Assert initial
            expect(formEl.textContent).not.toContain(expected);

            // Act
            emailControl.setErrors({ required: true });
            emailControl.markAsTouched();
            fixture.detectChanges();

            // Assert
            expect(formEl.textContent).toContain(expected);
        });

        test('shows a hint when it has an email error and is touched', () => {
            // Arrange
            const { fixture, component } = arrange();
            const emailControl = component.form.get('email');
            const formEl = getForm(fixture.debugElement);

            const expected = 'Enter a valid email address';

            // Assert initial
            expect(formEl.textContent).not.toContain(expected);

            // Act
            emailControl.setErrors({ email: true });
            emailControl.markAsTouched();
            fixture.detectChanges();

            // Assert
            expect(formEl.textContent).toContain(expected);
        });
    });

    describe('password', () => {
        test('shows a label', () => {
            // Arrange
            const { fixture } = arrange();
            const labelDe = fixture.debugElement.query(By.css('label.password'));
            const labelEl: HTMLLabelElement = labelDe.nativeElement;

            // Assert
            expect(labelEl.textContent).toContain('Password');
        });

        test('shows an input that is connected to the form', () => {
            // Arrange
            const { fixture, component } = arrange();
            const passwordControl = component.form.get('password');
            const passwordEl = getPasswordInput(fixture.debugElement);

            // Assert initial
            expect(passwordEl.value).toBeFalsy();
            expect(passwordControl.value).toBeFalsy();

            // Act
            passwordEl.value = 'I am your father';
            passwordEl.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            // Assert
            expect(passwordEl.value).toBe('I am your father');
            expect(passwordControl.value).toBe('I am your father');
        });

        test('shows a hint when it has a required error and is touched', () => {
            // Arrange
            const { fixture, component } = arrange();
            const passwordControl = component.form.get('password');
            const errorHints = getPasswordErrors(fixture.debugElement);

            const expected = 'Password is required';

            // Assert initial
            expect(errorHints.textContent).not.toContain(expected);

            // Act
            passwordControl.setErrors({ required: true });
            passwordControl.markAsTouched();
            fixture.detectChanges();

            // Assert
            expect(errorHints.textContent).toContain(expected);
        });

        test('shows a hint when it has a minlength error and is touched', () => {
            // Arrange
            const { fixture, component } = arrange();
            const passwordControl = component.form.get('password');
            const errorHints = getPasswordErrors(fixture.debugElement);

            const expected = 'Password has to be at least 8 characters';

            // Assert initial
            expect(errorHints.textContent).not.toContain(expected);

            // Act
            passwordControl.setErrors({ minlength: true });
            passwordControl.markAsTouched();
            fixture.detectChanges();

            // Assert
            expect(errorHints.textContent).toContain(expected);
        });

        test('shows a hint when it has a hasCapitalCase error and is touched', () => {
            // Arrange
            const { fixture, component } = arrange();
            const passwordControl = component.form.get('password');
            const errorHints = getPasswordErrors(fixture.debugElement);

            const expected = 'Password has to contain at least one capital character';

            // Assert initial
            expect(errorHints.textContent).not.toContain(expected);

            // Act
            passwordControl.setErrors({ hasCapitalCase: true });
            passwordControl.markAsTouched();
            fixture.detectChanges();

            // Assert
            expect(errorHints.textContent).toContain(expected);
        });

        test('shows a hint when it has a hasLowerCase error and is touched', () => {
            // Arrange
            const { fixture, component } = arrange();
            const passwordControl = component.form.get('password');
            const errorHints = getPasswordErrors(fixture.debugElement);

            const expected = 'Password has to contain at least one lower character';

            // Assert initial
            expect(errorHints.textContent).not.toContain(expected);

            // Act
            passwordControl.setErrors({ hasLowerCase: true });
            passwordControl.markAsTouched();
            fixture.detectChanges();

            // Assert
            expect(errorHints.textContent).toContain(expected);
        });

        test('shows a hint when it has a noFirstNameInPassword error and is touched', () => {
            // Arrange
            const { fixture, component } = arrange();
            const passwordControl = component.form.get('password');
            const errorHints = getPasswordErrors(fixture.debugElement);

            const expected = 'Password may not contain your first name';

            // Assert initial
            expect(errorHints.textContent).not.toContain(expected);

            // Act
            component.form.setErrors({ noFirstNameInPassword: true });
            passwordControl.markAsTouched();
            fixture.detectChanges();

            // Assert
            expect(errorHints.textContent).toContain(expected);
        });

        test('shows a hint when it has a noLastNameInPassword error and is touched', () => {
            // Arrange
            const { fixture, component } = arrange();
            const passwordControl = component.form.get('password');
            const errorHints = getPasswordErrors(fixture.debugElement);

            const expected = 'Password may not contain your last name';

            // Assert initial
            expect(errorHints.textContent).not.toContain(expected);

            // Act
            component.form.setErrors({ noLastNameInPassword: true });
            passwordControl.markAsTouched();
            fixture.detectChanges();

            // Assert
            expect(errorHints.textContent).toContain(expected);
        });
    });

    describe('password confirmation', () => {
        test('shows a label', () => {
            // Arrange
            const { fixture } = arrange();
            const labelDe = fixture.debugElement.query(By.css('label.password-confirmation'));
            const labelEl: HTMLLabelElement = labelDe.nativeElement;

            // Assert
            expect(labelEl.textContent).toContain('Password confirmation');
        });

        test('shows an input that is connected to the form', () => {
            // Arrange
            const { fixture, component } = arrange();
            const confirmationControl = component.form.get('passwordConfirmation');
            const confirmationEl = getPasswordConfirmationInput(fixture.debugElement);

            // Assert initial
            expect(confirmationEl.value).toBeFalsy();
            expect(confirmationControl.value).toBeFalsy();

            // Act
            confirmationEl.value = 'I am your father';
            confirmationEl.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            // Assert
            expect(confirmationEl.value).toBe('I am your father');
            expect(confirmationControl.value).toBe('I am your father');
        });

        test('shows a hint when it has a required error and is touched', () => {
            // Arrange
            const { fixture, component } = arrange();
            const confirmationControl = component.form.get('passwordConfirmation');
            const formEl = getForm(fixture.debugElement);

            const expected = 'Password confirmation is required';

            // Assert initial
            expect(formEl.textContent).not.toContain(expected);

            // Act
            confirmationControl.setErrors({ required: true });
            confirmationControl.markAsTouched();
            fixture.detectChanges();

            // Assert
            expect(formEl.textContent).toContain(expected);
        });

        test('shows a hint when it has a noLastNameInPassword error and is touched', () => {
            // Arrange
            const { fixture, component } = arrange();
            const confirmationControl = component.form.get('passwordConfirmation');
            const formEl = getForm(fixture.debugElement);

            const expected = 'Password is not the same';

            // Assert initial
            expect(formEl.textContent).not.toContain(expected);

            // Act
            component.form.setErrors({ notSame: true });
            confirmationControl.markAsTouched();
            fixture.detectChanges();

            // Assert
            expect(formEl.textContent).toContain(expected);
        });
    });
});
