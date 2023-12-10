import { ReactNode, createContext } from 'react';
import { useActor } from '@xstate/react';
import { Sender, AnyInterpreter } from 'xstate';
import { globalService } from "../globalState";
import { AccessEvents } from 'models';


type IAuthContextValue = {
    send: Sender<AccessEvents>
    state: unknown;
    service: AnyInterpreter
}

type ProviderProps = {
    children: ReactNode
}


const AuthContext = createContext<IAuthContextValue>({
    send: globalService.send,
    state: globalService.getSnapshot(),
    service: globalService
});




const AuthProvider = ({ children }: ProviderProps) => {
    const [state, send] = useActor(globalService);

    return (
        <AuthContext.Provider value={{ state, send, service: globalService }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider }