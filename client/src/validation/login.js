import {emailRuls, passRuls} from "validation/global";

export function Login(values){
    const errors = {
        ...emailRuls(values),
        ...passRuls(values)
    };

    return errors;
}