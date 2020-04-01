import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { UserRegistration } from '../_shared/user.registration';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    success: boolean;
    error: string;
    userRegistration: UserRegistration = { name: '', email: '', password: '' };
    submitted = false;

    constructor(
        private authService: AuthService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit() {}

    onSubmit() {
        this.spinner.show();

        this.authService
            .register(this.userRegistration)
            .pipe(
                finalize(() => {
                    this.spinner.hide();
                })
            )
            .subscribe(
                result => {
                    if (result) {
                        this.success = true;
                    }
                },
                error => {
                    this.error = error;
                }
            );
    }
}
