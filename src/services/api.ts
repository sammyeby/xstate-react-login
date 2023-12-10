import axios, { AxiosRequestHeaders } from 'axios';
import { IApiRequest  } from 'models';
import { globalService } from "../globalState";



export const getAccessToken = (): string => {
    const { user } = globalService.getSnapshot().context;
    return user?.accessToken ? user.accessToken : '';
};


const API_BASE_URL = () => {
    const { apiBaseUrl } = globalService.getSnapshot().context;
    return apiBaseUrl
}

const api = () => {
    const headers = {
        "content-type": "application/json",
        "Accept": "application/json, text/plain, */*",
    };
    const defaultConfig = {
        headers,
        baseURL: API_BASE_URL()
    };

    return axios.create(defaultConfig);
}

let apiClient = api();
globalService.onEvent((event) => {
    if (event.type === "UPDATE_API_BASE_URL") {
        apiClient = api()
    }
})

// Request interceptor for API calls
apiClient.interceptors.request.use(
    async config => {
        const accessToken = getAccessToken();
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${accessToken}`
        } as AxiosRequestHeaders
        return config;
    },
    error => {
        return Promise.reject(error)
    });

// Response interceptor for API calls
apiClient.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // Get new token
        const apiUrl = API_BASE_URL();
        const { data } = await axios.get(`${apiUrl}/refresh`);
        const { accessToken } = data;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        globalService.send({type: "GET_USER_DONE", data: {...data, isAuthenticated: true}, url: ''});
        return apiClient(originalRequest);
    }
    return Promise.reject(error);
});


const apiRequest = async ({method, endpointUrl, data, headers}: IApiRequest) => {
    return await apiClient({
        method,
        url: `${endpointUrl}`,
        data,
        headers: {...headers},
        withCredentials: true,
    });
}

export {
    apiRequest,
    apiClient,
    api
};
