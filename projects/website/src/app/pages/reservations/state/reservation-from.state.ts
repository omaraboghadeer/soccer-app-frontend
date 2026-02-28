import { Injectable, signal } from '@angular/core';
import { FieldModel } from '@domain/field/field.model';

@Injectable({
    providedIn: 'root',
})
export class ReservationFromState {

    selectedField = signal<FieldModel | null>(null);
    selectedDate = signal<Date | null>(null);
    selectedTime = signal<string | null>(null);
    selectedSlots = signal<string[]>([]);
    contactInformation = signal<{firstName: string, lastName: string, mobile: string} | null>(null);

    reset() {
        this.selectedField.set(null);
        this.selectedDate.set(null);
        this.selectedTime.set(null);
        this.selectedSlots.set([]);
        this.contactInformation.set(null);
    }

}
