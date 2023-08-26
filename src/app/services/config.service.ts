import { InjectionToken } from "@angular/core";
import { Config } from "src/app/interfaces/config.interface";
import { environment } from '../../environments/environment';

export const SERVICE_CONFIG = new InjectionToken<Config>('config');

export const CONFIG: Config = {
    apiEndpoint: environment.apiEndpoint
}