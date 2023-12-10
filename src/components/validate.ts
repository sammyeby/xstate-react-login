import { ILoginCredentials, INewUser } from "models";

type LoginErrorProps = {
    email?: string;
    password?: string;
}

type SignUpErrorProps = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    pin?: string
}

const validateSignup = (values: INewUser) => {
    const errors: SignUpErrorProps = {};
    
    if (!values.firstName) {
        errors.firstName = "First name is required"
    }
    if (!values.lastName) {
        errors.lastName = "Last name is required"
    }
    if (!values.email) {
        errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }
    if (!values.password) {
        errors.password = "Password is required";
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = "Field is required";
    }
    if (values.password && !values.confirmPassword) {
        errors.confirmPassword = "Please repeat password";
    } else if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords must match";
    }
    if (!values.pin) {
        errors.pin = "Pin is required";
    } else if (values.pin.length !== 6) {
        errors.pin = "Pin must be 6 alphanumeric letters"
    }

    return errors;
};

const validateLogin = (values: ILoginCredentials) => {
    const errors: LoginErrorProps = {};
    if (!values.email) {
        errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }
    if (!values.password) {
        errors.password = "Password is required";
    }
    
    return errors;
};

export { validateLogin, validateSignup };