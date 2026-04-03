export type FieldSize = "5v5" | "7v7" | "12v12";

export type TFieldAddress = {
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

export type TWorkingTime = {
    start: string;
    end: string;
}

export interface IFieldModel {
    id: string,
    name: string,
    phone: string,
    workingTime: TWorkingTime;
    address: TFieldAddress,
    supportedSizes: string[],
    price: number, // 100 EGP
    images: string[],
    owner?: string | null,
}