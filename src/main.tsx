import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AppBootstrapWithAuth } from './AppBootstrapWithAuth.tsx'
import './index.scss'
import { TestAuthPage } from 'components/TestAuthPage.tsx';

const testRoutes = [{
  path: '/protected',
  element: <TestAuthPage />,
  protected: true
}]

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AppBootstrapWithAuth
        headline='Test App'
        successRedirectPath='/protected'
        apiBaseUrl='https://api.samuelumeh.com/demo'
        loginEndpoint='/login'
        signupEndpoint='/sign-up'
        routes={testRoutes}
      />
    </Router>
  </React.StrictMode>,
)
