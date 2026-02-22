import { inject, Injectable } from "@angular/core";
import { API_CONFIG } from "./api.config";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class ApiService {
    protected readonly http = inject(HttpClient);
    protected readonly config = inject(API_CONFIG);
    protected readonly baseUrl = this.config.baseUrl;
    
    protected readonly localAPIs = this.config.localAPIs;
}
