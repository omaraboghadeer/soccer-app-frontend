import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { ReservationFromState } from '../../state/reservation-from.state';

interface ContactInformationFormData {
    firstName: string;
    lastName: string;
    mobile: string;
}

@Component({
    selector: 'app-contact-information',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormField],
    templateUrl: './contact-information.component.html',
})
export class ContactInformationComponent {
    private readonly _reservationState = inject(ReservationFromState);

    contactModel = signal<ContactInformationFormData>({
        firstName: '',
        lastName: '',
        mobile: ''
    });

    contactForm = form(this.contactModel, (fieldPath) => {
        required(fieldPath.firstName, {message: 'First name is required'});
        required(fieldPath.lastName, {message: 'Last name is required'});
        required(fieldPath.mobile, {message: 'Mobile number is required'});
        // Add more validators as needed, e.g., pattern for mobile number
    });
    

    onSubmit(event: Event | any) {
        event?.preventDefault();
        this.contactForm().markAsTouched();
        
        submit(this.contactForm, async () => {
            const contactInfo = this.contactForm().value();
            this._reservationState.contactInformation.set(contactInfo);
            console.log("Contact Information Submitted:", contactInfo);
        });
    }
    
}
