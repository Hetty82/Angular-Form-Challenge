export interface SignUpData {
    firstName: string;
    lastName: string;
    email: string;
}

export interface SignUpFormData extends SignUpData {
    password: string;
    passwordConfirmation: string;
}

export interface Feedback {
    type: 'success' | 'error';
    message: string;
}
