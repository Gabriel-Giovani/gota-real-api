import { EErrors } from '../../../components/error';
import * as Yup from 'yup';
import { getValidatedObjectFromSchema } from '../../../helpers/validators';

export const userCreate = (
    name: string,
    username: string,
    email: string,
    password: string,
    repeatedPassword: string,
    ) => {
    const body = {
        name,
        username,
        email,
        password,
        repeatedPassword
    };

    const schema = Yup.object().shape({
        name: Yup.string()
            .typeError(EErrors.INVALID_NAME)
            .required(EErrors.INVALID_NAME),
        username: Yup.string()
            .typeError(EErrors.INVALID_USERNAME)
            .required(EErrors.INVALID_USERNAME),
        email: Yup.string()
            .typeError(EErrors.INVALID_EMAIL)
            .required(EErrors.INVALID_EMAIL),
        password: Yup.string()
            .typeError(EErrors.INVALID_PASSWORD)
            .required(EErrors.INVALID_PASSWORD),
        repeatedPassword: Yup.string()
            .typeError(EErrors.INVALID_REPEATED_PASSWORD)
            .required(EErrors.INVALID_REPEATED_PASSWORD)
    });

    return getValidatedObjectFromSchema<{
        name: string,
        username: string,
        email: string,
        password: string,
        repeatedPassword: string
    }>(schema, body);
};