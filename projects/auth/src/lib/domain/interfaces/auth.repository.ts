import { Observable } from "rxjs";
import { UserModel } from "../entities/user.model";

type TApiResponse<T> = {
    sucess: boolean,
    message?: string,
    data?: T,
}

export interface AuthRepository {
    login(phone: string, password: string): Observable<TApiResponse<UserModel>>;

    // TODO:: Create RegisterDto
    register(payload: any): Observable<TApiResponse<null>>;
}
