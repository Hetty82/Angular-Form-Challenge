import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SignUpData } from '../models/sign-up.model';
import { SignUpService } from './sign-up.service';

describe('SignUpService', () => {
    const arrange = (overrides?: any) => {
        const stub = {
            ...overrides,
        };

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });

        const service = TestBed.inject(SignUpService);
        const httpTestingController = TestBed.inject(HttpTestingController);

        return { service, httpTestingController, stub };
    };

    it('posts the sign up data to the correct url', () => {
        // Arrange
        const data: SignUpData = {
            firstName: 'Leia',
            lastName: 'Organa',
            email: 'leia@rebel-alliance.org',
        };
        const observer = jest.fn();
        const { service, httpTestingController } = arrange();

        // Act
        service.signUp$(data).subscribe(observer);

        // Assert
        const req = httpTestingController.expectOne('https://demo-api.now.sh/users');
        expect(req.request.method).toEqual('POST');

        req.flush({});
        expect(observer).toBeCalled();

        httpTestingController.verify();
    });
});
