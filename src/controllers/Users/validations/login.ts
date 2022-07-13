import * as Yup from 'yup';
import { getValidatedObjectFromSchema } from '../../../helpers/validators';
import { EErrors } from '../../../components/error';

export const userLogin = (username: string, password: string) => {
    const body = {
        username,
        password
    };

    const schema = Yup.object().shape({
        username: Yup.string()
            .typeError(EErrors.INVALID_LOGIN)
            .required(EErrors.INVALID_LOGIN),
        password: Yup.string()
            .typeError(EErrors.INVALID_LOGIN)
            .required(EErrors.INVALID_LOGIN)
    });

    return getValidatedObjectFromSchema<{
        username: string,
        password: string
    }>(schema, body);
}