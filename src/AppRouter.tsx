import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { AccessEvents, IRouteList, IUser } from 'models';
import { useConfig, useAuth } from 'hooks';
import { DemoLogin, DemoSignUp } from 'components';
import { StateMachine, StateSchema } from 'xstate';


const INIT_ROUTES: IRouteList = [
    {
        path: '/',
        element: <Navigate to="/login" replace />
    },
    {
        path: '/login',
        element: <DemoLogin />,
        displayName: 'Login',
    },
    {
        path: '/signup',
        element: <DemoSignUp />,
        displayName: 'Sign Up'
    }
];


const AppRouter = () => {
    const location = useLocation();
    const { config } = useConfig()
    const { state } = useAuth();
    const localState = state as StateMachine<{ user: IUser | null }, StateSchema, AccessEvents>
    const { user } = localState.context;
    const appRoutes: IRouteList = [...INIT_ROUTES, ...config.routes];


    return (
        <Routes>
            {appRoutes.map((route, idx) => route.protected ?
                <Route
                    path={route.path}
                    element={user?.isAuthenticated ? route.element : <Navigate to="/login" state={{ from: location }} replace />} 
                    key={`${route.path}_${idx}`} /> :
                <Route path={route.path} element={route.element} key={`${route.path}_${idx}`} />
            )}
        </Routes>
    )
}



export default AppRouter;