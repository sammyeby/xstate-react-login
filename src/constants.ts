import { ConfigProps } from "context";


export const CONFIG_INIT_VALUES: ConfigProps = {
    headline: 'Demo Login Component',
    successRedirectPath: '/protected',
    apiBaseUrl: 'https://api.samuelumeh.com',
    loginEndpoint: '/demo/login',
    loginRequestMethod: 'get',
    signupRequestMethod: 'post',
    signupEndpoint: '/demo/sign-up',
    routes: []
}