export type UserRole = "NORMAL" | "FIELD_OWNER" | "ADMIN" | "SUPER_ADMIN";
export interface UserAddress {
    governorate: {
        id: string;
        name_ar: string;
        name_en: string;
    };
    city: {
        id: string;
        name_ar: string;
        name_en: string;
        governorate_id: string;
    };
}

export interface UserModel {
    id: string;
    name: string;
    phone: string;
    address: UserAddress;
    password: string;
    role: UserRole;
    createdAt: Date;
}
