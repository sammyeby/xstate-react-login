import { Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useActor } from '@xstate/react'
import { useAuth, useConfig } from 'hooks'
import { ConfigProvider, ConfigProps, AuthProvider } from 'context'
import AppRouter from './AppRouter'
import './App.scss'
import { globalService } from 'globalState'



const AppBootstrap = (props: ConfigProps) => {
  const location = useLocation();
  const { service } = useAuth();
  const { config, setConfig } = useConfig();
  const { isSet } = config;
  const [isReady, setIsReady] = useState<boolean>(false);
  const [state, send] = useActor(service);
  const noUser = state.matches("noUser");
  const hasAccess = state.matches("hasUser");
  const hasNoAccess = state.matches("noAccess");

  if (noUser) {
    send({ type: "GET_USER", data: null });
  }


  useEffect(() => {

    setConfig((prevConfig) => ({ ...prevConfig, ...props, isSet: true }))

  }, [props, setConfig])


  useEffect(() => {
    if (isSet && (hasAccess || hasNoAccess)) {
      setIsReady(true);
    }
  
  }, [isSet, hasAccess, hasNoAccess]);


  return (
    <>
      {isReady && <AppRouter />}
      {!isReady ?
        (<div>Loading...</div>) :
        hasAccess ?
          <Navigate to={location.pathname ? location.pathname : ''} replace /> :
          location.pathname === "/signup" ? (<Navigate to="/signup" replace />) : (<Navigate to="/login" replace />)
      }
    </>
  )
};

  


const AppBootstrapWithAuth = (props: ConfigProps) => {
 const { send } = useAuth()
 send({type: "UPDATE_API_BASE_URL", url: props.apiBaseUrl, data: null})
 
  globalService.onTransition((state) => console.log(state.value))
    .start();

  return (
    <ConfigProvider>
      <AuthProvider>
        <AppBootstrap {...props} />
      </AuthProvider>
    </ConfigProvider>
  )
}

export { AppBootstrapWithAuth }

