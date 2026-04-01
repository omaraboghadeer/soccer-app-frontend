import { InjectionToken } from "@angular/core";
import { IEnvironment } from "@domain";

export const API_CONFIG = new InjectionToken<IEnvironment>('API_CONFIG');