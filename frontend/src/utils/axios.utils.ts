import {BackendConstants} from "../constants/backend.constants.ts";
import axios, {AxiosRequestConfig} from 'axios';

export class AxiosUtils {

    public static post<T, R>(url: BackendConstants, body: R): Promise<{ data: T }> {
        return axios.post(url, body, this.buildConfig());
    }

    private static buildConfig(): AxiosRequestConfig {
        return {
            baseURL: import.meta.env.VITE_BACKEND_URL,
        }
    }
}