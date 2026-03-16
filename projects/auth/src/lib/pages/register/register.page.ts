import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RegistrationService } from '@auth/state/registration.service';
import { OtpComponent } from '@ui/otp/otp.component';
import { ToastService } from '@ui/toast/toast.service';
import { NormalUserFormComponent } from './components/normal-user-form/normal-user-form.component';
import { FieldFormComponent } from "./components/field-form/field-form.component";

interface IStepper {
    step: number;
    label: string;
    title: string;
    active: boolean;
    completed: boolean;
}

type TSignUpType = {
    id: string;
    icon: string;
    label: string;
    value: 'player' | 'fieldOwner';
}

@Component({
    selector: 'lib-register',
    imports: [
        RouterLink,
        NgTemplateOutlet,
        NgClass,
        NormalUserFormComponent,
        FormsModule,
        OtpComponent,
        FieldFormComponent
    ],
    templateUrl: './register.page.html',
    styleUrl: './register.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
    
    constructor() {
        effect(() => {
            if (this.selectedType() == 'fieldOwner') {
                this.steps.update((v) => {
                    const exists = this.steps().some(s => s.step === 4);
                    if (exists) return this.steps();
                    
                    v.splice(2, 0, {
                        step: 4,
                        label: 'Field form',
                        title: 'Complete field information',
                        active: false,
                        completed: false,
                    })
                    return v
                });
            } else {
                this.steps.set([...this.originalStepsModel()]);
            }
        })
    }

    signupTypes = signal<TSignUpType[]>([
        { 
            id: 'signupPlayerType',
            icon: 'icon-player',
            label: 'Player',
            value: 'player',
        },
        { 
            id: 'signupFieldOwnerType',
            icon: 'icon-pitch',
            label: 'Field onwer',
            value: 'fieldOwner',
        }
    ]);

    selectedType = signal<'player' | 'fieldOwner'>(this.signupTypes()[1].value);

    handleOTPActions(ev: any) {
        this._registrationService.otpValueState.set(ev);
    }

    //#region Stepper
    protected readonly _registrationService = inject(RegistrationService);
    protected readonly _toastSevice = inject(ToastService)
    protected readonly _normalUserFormComponent = viewChild.required(NormalUserFormComponent);
    protected readonly _fieldFormComponent = viewChild.required(FieldFormComponent);
   

    currentStepIndex = signal(0);
    protected readonly originalStepsModel = signal<IStepper[]>([
        { 
            step: 1,
            label: 'Registration type', 
            title: "Select user type", 
            active: true, 
            completed: false 
        },
        { 
            step: 2,
            label: 'Signup form', 
            title: "Registration information",
            active: false, 
            completed: false 
        },
        { 
            step: 3,
            label: 'Verification code', 
            title: "Select user type", 
            active: false, 
            completed: false 
        }
    ])
    steps = signal<IStepper[]>([...this.originalStepsModel()]);

    
    nextStep() {
        const validation = this.stepperValidation(this.currentStepIndex());
        if (validation !== true) {
            this._toastSevice.show({message: validation as string, type: 'error' });
            return;
        }
        
        const currentIndex = this.currentStepIndex();
        // Mark current step as completed
        this.steps.update(steps => {
            const updatedSteps = [...steps];
            updatedSteps[currentIndex].completed = true;
            return updatedSteps;
        });

        const next = this.currentStepIndex() + 1;
        if (next < this.steps().length) {
            // this.loadComponent(next);
            this.currentStepIndex.set(next);
            this.steps.update(steps => {
                const updatedSteps = [...steps];
                updatedSteps[next].active = true;
                return updatedSteps;
            });
        }
    }

    previousStep() {
        const currentIndex = this.currentStepIndex();

        // Mark current step as completed
        this.steps.update(steps => {
            const updatedSteps = [...steps];
            updatedSteps[currentIndex].active = false;
            return updatedSteps;
        });

        const prev = this.currentStepIndex() - 1;
        if (prev >= 0) {
            // this.loadComponent(prev);
            this.currentStepIndex.set(prev);
            this.steps.update(steps => {
                const updatedSteps = [...steps];
                updatedSteps[prev].completed = false;
                updatedSteps[prev].active = true;
                return updatedSteps;
            });
        }
    }

    private stepperValidation(stepNumber: number): string | boolean {
        const step = this.steps()[stepNumber].step;

        switch (step) {
            case 1:
                return this.selectedType() ? true : "Select a field to proceed";
            
            case 2:
                this._normalUserFormComponent().onSubmit();
                const value = this._registrationService.normalUserFormState();
                return value ? true : "Please fill in all fields to proceed";

            case 4: 
                this._fieldFormComponent().onSubmit();
                const v = this._registrationService.fieldOwnerFormState();
                return v ? true : "Please fill in all fields to proceed";

            default:
                return false;
        }
    }

    submitUserInfo() {
        const value = this._registrationService.otpValueState();
        const isStringOrNull = (!value || typeof value == 'string'); 
    
        if (isStringOrNull) {
            this._toastSevice.show({
                message: 'Please enter your OTP number to confirm',
                type: 'error'
            });
            return
        }

        // TODO:: call API
    }
    //#endregion Stepper
}
