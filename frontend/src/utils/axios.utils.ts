import {BackendConstants} from "../constants/backend.constants.ts";
import axios, {AxiosRequestConfig} from 'axios';
import {SessionStorageConstants} from "../constants/session-storage.constants.ts";

export class AxiosUtils {

    public static post<T, R>(url: BackendConstants, body: R, token?: string): Promise<{ data: T }> {
        return axios.post<T>(url, body, this.buildConfig(token));
    }

    public static patch<T, R>(url: BackendConstants, body: R, token?: string): Promise<{ data: T }> {
        return axios.patch<T>(url, body, this.buildConfig(token));
    }

    public static get<T, R>(url: BackendConstants, params?: R, token?: string): Promise<{ data: T }> {
        const config = this.buildConfig(token);
        if (params) config.params = params;
        return axios.get(url, config);
    }

    public static mapError(err: ErrorResponse, callBack: (err: ErrorResponse) => (void), auth = true): void {
        if (auth && err?.response?.data?.code == 401) {
            console.log("HERE")
            sessionStorage.removeItem(SessionStorageConstants.AUTH_TOKEN);
            sessionStorage.removeItem(SessionStorageConstants.USER);
            window.location.href = "/";
        } else callBack(err);
    }

    private static buildConfig(token?: string): AxiosRequestConfig {
        return {
            baseURL: import.meta.env.VITE_BACKEND_URL,
            headers: {
                authorization: token ? `Bearer ${token}` : undefined
            }
        }
    }
}