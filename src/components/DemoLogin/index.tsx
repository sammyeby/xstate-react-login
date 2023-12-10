import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { Form, Field } from 'react-final-form';
import { ILoginCredentials } from 'models';
import { useAuth, useConfig } from 'hooks';
import { userLogin } from 'services';
import styles from './DemoLogin.module.scss'
import { TextInputField } from 'components/shared';
import { useActor } from '@xstate/react';
import { validateLogin } from 'components/validate';



const DemoLogin = () => {
    const { service } = useAuth();
    const { config } = useConfig();
    const [state, send] = useActor(service);
    const navigate = useNavigate();
    const location = useLocation();
    const { loginEndpoint, successCallback, errorCallback } = config;
    const hasAccess = state.matches("hasUser");


    const submitHandler = async (values: ILoginCredentials) => {
        try {
            const result = await userLogin(loginEndpoint, values);
            send({ type: "GET_USER_DONE", data: { ...result.data, isAuthenticated: true } });
            if (successCallback) {
                successCallback();
            }
        } catch (e) {
            if (errorCallback) {
                errorCallback();
            }
            console.log('ERROR: ', e);
        }
    };


    return !hasAccess ? (
        <Box>
            <Typography variant="h4" component="h4" gutterBottom>
                {config.headline || 'Demo Login Component'}
            </Typography>
            <Form
                onSubmit={submitHandler}
                validate={validateLogin}
                render={({ handleSubmit, submitFailed, submitting, pristine }) => (
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { mb: 2 } }}
                        noValidate autoComplete="off"
                        onSubmit={handleSubmit}
                        className={styles.loginForm}
                    >
                        <div>
                            <Field
                                name="email"
                                component={TextInputField}
                                required
                                label="Email"
                                className={styles.inputText}
                            />
                        </div>
                        <div>
                            <Field
                                name="password"
                                component={TextInputField}
                                required
                                label="Password"
                                type='password'
                                className={styles.inputText}
                            />
                        </div>
                        {submitFailed && <span>Something went wrong!</span>}
                        <Box sx={{ mb: 2, mt: 2 }}>
                            <Button
                                className={styles.submitButton}
                                variant="contained"
                                type="submit"
                                disabled={submitting || pristine}
                            >
                                Login
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex', placeItems: 'center' }}>
                            <Typography variant="body2">
                                Don't have an account?
                            </Typography>
                            <Button variant="text" onClick={() => { navigate('/signup') }}>Sign up here!</Button>
                        </Box>
                    </Box>
                )}
            />
        </Box>
    ) : <Navigate to={location.pathname} state={{ from: location }} replace />
}

export { DemoLogin }