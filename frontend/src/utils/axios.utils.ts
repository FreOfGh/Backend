import {BackendConstants} from "../constants/backend.constants.ts";
import axios, {AxiosRequestConfig} from 'axios';

export class AxiosUtils {

    public static post<T, R>(url: BackendConstants, body: R): Promise<{ data: T }> {
        return axios.post(url, body, this.buildConfig());
    }

    public static get<T, R>(url: BackendConstants, params?: R, token?: string): Promise<{ data: T }> {
        const config = this.buildConfig(token);
        if (params) config.params = params;
        return axios.get(url, config);
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