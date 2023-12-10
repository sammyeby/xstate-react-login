// import { AxiosResponse } from "axios";
import { apiClient } from './api';
import { ILoginCredentials, INewUser } from "models";



const userLogin = async (reqUrl: string, data: ILoginCredentials) => {
    return apiClient.post(reqUrl, data);
};

const logoutUser = async (reqUrl: string) => {
    return apiClient.post(reqUrl, {});
};

const signUp = async (reqUrl: string, data: INewUser) => {
    return apiClient.post(reqUrl, data);
};


export { userLogin, logoutUser, signUp };