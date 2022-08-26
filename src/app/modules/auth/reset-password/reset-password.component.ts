import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, NgForm, Validators} from '@angular/forms';
import {finalize, Subject, takeUntil} from 'rxjs';
import {fuseAnimations} from '@fuse/animations';
import {FuseValidators} from '@fuse/validators';
import {FuseAlertType} from '@fuse/components/alert';
import {AuthService} from 'app/core/auth/auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'auth-reset-password',
    templateUrl: './reset-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthResetPasswordComponent implements OnInit {
    @ViewChild('resetPasswordNgForm') resetPasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    resetPasswordForm: UntypedFormGroup;
    showAlert: boolean = false;
    tokenPassword: string;

    unsubscribe: Subject<void> = new Subject();

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _activatedRoute: ActivatedRoute
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._activatedRoute.params
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(params => {
                this.tokenPassword = params?.token || '';
            });

        // Create the form
        this.resetPasswordForm = this._formBuilder.group({
                password: ['', Validators.required],
                confirmPassword: ['', Validators.required]
            },
            {
                validators: FuseValidators.mustMatch('password', 'confirmPassword')
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Reset password
     */
    resetPassword(): void {
        // Return if the form is invalid
        if (this.resetPasswordForm.invalid) {
            return;
        }

        // Disable the form
        this.resetPasswordForm.disable();

        // Hide the alert
        this.showAlert = false;

        const payload = this.resetPasswordForm.getRawValue();
        payload.tokenPassword = this.tokenPassword;

        // Send the request to the server
        this._authService.resetPassword(payload)
            .pipe(
                finalize(() => {

                    // Re-enable the form
                    this.resetPasswordForm.enable();

                    // Reset the form
                    this.resetPasswordNgForm.resetForm();

                    // Show the alert
                    this.showAlert = true;
                })
            )
            .subscribe(
                (response) => {

                    // Set the alert
                    this.alert = {
                        type: 'success',
                        message: 'Tu contraseña ha sido restablecida exitosamente, ya puedes iniciar sesión en la aplicación.'
                    };
                },
                (response) => {

                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: 'Ocurrió algún error, intentelo nuevamente.'
                    };
                }
            );
    }
}
