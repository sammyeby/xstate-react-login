import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { Form, Field } from 'react-final-form';
import { useActor } from '@xstate/react';
import { useAuth, useConfig } from 'hooks';
import { TextInputField } from 'components/shared';
import { signUp } from 'services';
import styles from './DemoSignUp.module.scss'
import { INewUser } from 'models';
import { validateSignup } from 'components/validate';

const DemoSignUp = () => {
    const { service } = useAuth();
    const { config } = useConfig();
    const [state, send] = useActor(service);
    const location = useLocation();
    const navigate = useNavigate();
    const { signupEndpoint, successCallback, errorCallback } = config;
    const hasAccess = state.matches("hasUser");

    const submitHandler = async (values: INewUser) => {
        try {
            const result = await signUp(signupEndpoint, values);
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
                validate={validateSignup}
                render={({ handleSubmit, submitFailed, submitting, pristine }) => (
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { mb: 2 } }}
                        noValidate autoComplete="off"
                        onSubmit={handleSubmit}
                        className={styles.signUpForm}
                    >
                        <div>
                            <Field
                                name="firstName"
                                component={TextInputField}
                                required
                                label="First name"
                                className={styles.inputText}
                            />
                        </div>
                        <div>
                            <Field
                                name="lastName"
                                component={TextInputField}
                                required
                                label="Last name"
                                className={styles.inputText}
                            />
                        </div>
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
                        <div>
                            <Field
                                name="confirmPassword"
                                component={TextInputField}
                                required
                                label="Confirm Password"
                                type='password'
                                className={styles.inputText}
                            />
                        </div>
                        <div>
                            <Field
                                name="pin"
                                component={TextInputField}
                                required
                                label="Pin"
                                inputProps={{
                                    maxLength: 6,
                                }}
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
                                Sign up
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex', placeItems: 'center' }}>
                            <Typography variant="body2">
                                Already have an account?
                            </Typography>
                            <Button variant="text" onClick={() => { navigate('/login') }}>Login here!</Button>
                        </Box>
                    </Box>
                )}
            />
        </Box>
    ) : <Navigate to={location.pathname} state={{ from: location }} replace />
}

export { DemoSignUp }