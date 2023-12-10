import { RouteObject } from 'react-router-dom';

export type IUser = {
    firstName: string;
    lastName: string;
    email: string;
    userId?: string;
    createdAt?: string;
    isAuthenticated?: boolean;
    accessToken?: string;
}

export type ILoginCredentials = {
    email: string;
    password: string;
}

export type INewUser = {
    password: string;
    confirmPassword: string;
    pin: string;
} & IUser

type EventData = { data: IUser | null; url: string }
export type AccessEvents =
    { type: 'GET_USER'; } & EventData |
    { type: 'GET_USER_DONE'; } & EventData |
    { type: 'REVOKE_USER'; } & EventData |
    { type: 'UPDATE_API_BASE_URL'; } & EventData;


export type IApiRequest = {
    method: string;
    endpointUrl: string;
    data?: object;
    headers?: object;
}


export type IRoute = RouteObject & {
    path: string;
    displayName?: string;
    protected?: boolean;
}

export type IRouteList = IRoute[];