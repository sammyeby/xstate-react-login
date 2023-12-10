import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { IRouteList } from "models";
import { CONFIG_INIT_VALUES } from "constants";

type ConfigProps = {
    headline?: string;
    successRedirectPath: string;
    apiBaseUrl: string;
    loginEndpoint: string;
    signupEndpoint: string;
    loginRequestMethod?: string,
    signupRequestMethod?: string,
    routes: IRouteList;
    successCallback?: (successData?: never) => void;
    errorCallback?: (errorData?: never) => void;
    isSet?: boolean;
}

type ProviderProps = {
    children: ReactNode
}


const ConfigContext = createContext<{ 
    config: ConfigProps, 
    setConfig: Dispatch<SetStateAction<ConfigProps>> 
}>({ config: CONFIG_INIT_VALUES, setConfig: () => {} })



const ConfigProvider = ({ children }: ProviderProps) => {
    const [config, setConfig] = useState<ConfigProps>(CONFIG_INIT_VALUES)
    
    return (
        <ConfigContext.Provider value={{ config, setConfig }}>
            {children}
        </ConfigContext.Provider>
    )
}

export { ConfigProvider, ConfigContext, type ConfigProps }