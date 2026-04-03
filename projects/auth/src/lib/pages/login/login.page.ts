import { NgTemplateOutlet, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { RouterLink } from "@angular/router";

interface ILoginFormData {
    mobile: string;
    password: string;
}

@Component({
    selector: 'lib-login',
    imports: [FormField, RouterLink, NgTemplateOutlet, NgClass],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.page.html',
})
export class LoginPage {

    private loginModel = signal<ILoginFormData>({
        mobile: '',
        password: ''
    });

    loginForm = form(this.loginModel, (fields) => {
        required(fields.mobile, {message: 'Mobile number is required'});
        required(fields.password, {message: 'Password is required'});
    });

    showPassword(input: HTMLInputElement) {
        if (input.type == 'password') 
            input.type = 'text';
        else 
            input.type = 'password';
    }

    onSubmit(event: Event) {
        event.preventDefault();
        this.loginForm().markAsTouched();

        submit(this.loginForm, async () => {
            const value = this.loginForm().value();
            console.log("🚀 ~ LoginPage ~ onSubmit ~ value:", value);
        });
    }

}
