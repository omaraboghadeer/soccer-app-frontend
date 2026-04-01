import { AfterViewInit, ChangeDetectionStrategy, Component, ComponentRef, effect, inject, PLATFORM_ID, signal, Type, viewChild, ViewContainerRef } from '@angular/core';
import { IFieldModel } from '@domain';
import { ToastService } from '@ui';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';
import { ContactInformationComponent } from '../../components/contact-information/contact-information.component';
import { DateAndTimeComponent } from '../../components/date-and-time/date-and-time.component';
import { FieldsComponent } from '../../components/fields/fields.component';
import { ReservationFromState } from '../../state/reservation-from.state';
import { RouterLink } from "@angular/router";
import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';

interface Stepper {
    component: Type<any>;
    label: string;
    title: string;
    active: boolean;
    completed: boolean;
}

@Component({
    selector: 'app-reservation-form',
    imports: [RouterLink, NgTemplateOutlet],
    templateUrl: './reservation-form.html',
    styleUrl: './reservation-form.scss',
    providers: [ ReservationFromState ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationForm implements AfterViewInit {
    private readonly _platformId = inject(PLATFORM_ID);
    private readonly _reservationState = inject(ReservationFromState);
    private readonly _toastSevice = inject(ToastService);
    readonly container = viewChild.required('stepperContentContainer', { read: ViewContainerRef });
    desktopView = signal(true);
    screenResizeObs: any;

    constructor() {
        if (!isPlatformBrowser(this._platformId)) return;

        this.screenResizeObs = new ResizeObserver(entries => {
            entries.forEach(entry => {
                const width = Math.floor(entry.contentRect.width);
                this.desktopView.set(width >= 992);
            });
        });
        this.screenResizeObs.observe(document.body);

        effect(() => {
            const index = this.currentStepIndex();
            if (this.container()) {
                this.loadComponent(index);
            }
        });
    }

    selectedField = signal<IFieldModel | null>(null);
    steps = signal<Stepper[]>([
        { component: FieldsComponent, label: 'Select Field', title: "Choose Your Field", active: true, completed: false },
        { component: DateAndTimeComponent, label: 'Select Date & Time', title: "Pick Date & Time", active: false, completed: false },
        { component: ContactInformationComponent, label: 'Contact Information', title: "Contact Details", active: false, completed: false },
        { component: ConfirmationComponent, label: 'Confirm Details', title: "Booking Confirmed!", active: false, completed: false }
    ]);
    currentStepIndex = signal(0);

    private componentRef!: ComponentRef<any>;

    private loadComponent(index: number) {
        const step = this.steps()[index];

        // Clear the container before adding a new component (optional)
        this.container().clear();

        // Create the component
        this.componentRef = this.container().createComponent(step.component);
    }

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
            this.loadComponent(next);
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
            this.loadComponent(prev);
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
        switch (stepNumber) {
            case 0:
                return this._reservationState.selectedField() !== null ? true : "Select a field to proceed";
            case 1:
                return this._reservationState.selectedSlots().length > 0 ? true : "Select at least one time slot to proceed";
            case 2:
                
                if (!this.componentRef) return false;
                
                const instance = this.componentRef.instance as ContactInformationComponent;
                instance.onSubmit(null);
                
                const contactInfo = this._reservationState.contactInformation();
                return contactInfo?.firstName && contactInfo?.lastName && contactInfo?.mobile ? true : "Please fill in all contact information fields to proceed";
            default:
                return false;
        }
    }


    ngAfterViewInit(): void {
        this.loadComponent(0);
    }

}
