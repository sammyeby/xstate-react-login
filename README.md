# Xstate + React + Login + SignUp Authentication

A demo application with Login and Signup features for quick project bootstrap



## Basic usage

```js
import { AppBootstrapWithAuth } from "xstate-react-login"
```

Define your routes:
```js
const testRoutes = [{
  path: '/dashboard',
  element: <TestAuthPage />,
  protected: true
}]
```
Then render the app wrapped around React Browser Router:

```html
<Router>
  <AppBootstrapWithAuth
    headline='Test App'
    successRedirectPath='/dashboard'
    apiBaseUrl='https://api.yourdomain.com'
    loginEndpoint='/login'
    signupEndpoint='/sign-up'
    routes={testRoutes}
  />
</Router>
```
