import {emailRuls, passRuls} from "validation/global";

export function Registration(values){
    const errors = {
        ...emailRuls(values),
        ...passRuls(values)
    };

    if(!values.confirmPassword){
        errors.confirmPassword = "Confirm Password is required";
    } else if(values.confirmPassword!==values.password){
        errors.confirmPassword = "Confirm Password needs to be equal password";
    }

    return errors;
}