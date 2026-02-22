export type FieldSize = "5v5" | "7v7" | "12v12";

export type Address = {
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
        lat: string | null,
        long: string | null
    }
}

export interface FieldModel {
    id: string,
    name: string,
    phone: string,
    address: Address,
    supportedSizes: string[],
    hourlyPrice: number, // 100 EGP
    workingStartHour: number,  // 4:00 PM => 16
    workingEndHour: number,    // 4:00 AM => 4
    ownerId: string | null
}