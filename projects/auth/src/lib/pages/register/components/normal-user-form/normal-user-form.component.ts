import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { IRegisterFormData, RegistrationService } from '@auth/state/registration.service';

@Component({
    selector: 'lib-normal-user-form',
    imports: [FormField, NgTemplateOutlet, NgClass],
    templateUrl: './normal-user-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NormalUserFormComponent {

    protected readonly _registrationService = inject(RegistrationService);

    private registerModel = signal<IRegisterFormData>({
        fname: 'omar',
        lname: 'khalifa',
        phone: '0565847484',
        password: '123',
        confirmPassword: '123',
        birthdate: new Date(1994, 10, 18, 5),
        role: "normal"
    });

    signupForm = form(this.registerModel, (fields) => {
        required(fields.fname, { message: 'First name is required' });
        required(fields.lname, { message: 'Last name is required' });
        required(fields.phone, { message: 'Mobile number is required' });
        required(fields.password, { message: 'Password is required' });
        required(fields.confirmPassword, { message: 'Confirm password is required' });
        required(fields.birthdate, { message: 'Birthdate is required' });
    });

    showPassword(input: HTMLInputElement) {
        if (input.type == 'password') 
            input.type = 'text';
        else 
            input.type = 'password';
    }

    

    async onSubmit(event?: Event) {
        event?.preventDefault();
        this.signupForm().markAsTouched();
        
        // Reset the value
        this._registrationService.reset();
        
        await submit(this.signupForm, async () => {
            const value = this.signupForm().value();
            this._registrationService.normalUserFormState.set(value);
        });
    }

}
