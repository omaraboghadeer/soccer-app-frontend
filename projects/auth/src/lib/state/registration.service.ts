import { Injectable, signal } from '@angular/core';

export interface IRegisterFormData {
    fname: string;
    lname: string;
    phone: string;
    birthdate: Date | string;
    password: string;
    confirmPassword: string;
    role: "normal"
}

export interface IFieldFormData {
    name: string;
    phone: string;
    price: number;
    workingTime: {
        start: string;
        end: string;
    },
    images: string[];
    supportedSizes: string[];
    address: {
        governorate: {
            id: string,
            name_ar: string,
            name_en: string
        },
        city: {
            governorate_id: string,
            name_ar: string,
            name_en: string,
            id: string
        },
        coordinates: {
            lat: number | string,
            lng: number | string
        }
    }
}

@Injectable({
    providedIn: 'root',
})
export class RegistrationService {

    normalUserFormState = signal<IRegisterFormData | null>(null);
    fieldOwnerFormState = signal<IFieldFormData | null>(null);
    otpValueState = signal<string | {value: string, isComplete: boolean} | null>(null);

    reset() {
        this.normalUserFormState.set(null);
        this.fieldOwnerFormState.set(null);
        this.otpValueState.set(null);
    }

}
