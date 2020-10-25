export const numPassChars = 3;

export const emailRuls = (values)=>{
    const errors = {};

    if (!values.email) {
        errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email address is invalid";
    }

    return errors;
}

export const passRuls = (values)=>{
    const errors = {};

    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < numPassChars) {
        errors.password = `Password needs to be equal or more than ${numPassChars} characters`;
    }
    
    return errors;
}