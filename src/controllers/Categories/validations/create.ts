import { EErrors } from '../../../components/error';
import * as Yup from 'yup';
import { getValidatedObjectFromSchema } from '../../../helpers/validators';

export const categoryCreate = (name: string) => {
    const body = { name };

    const schema = Yup.object().shape({
        name: Yup.string()
            .typeError(EErrors.INVALID_NAME)
            .required(EErrors.INVALID_NAME),
    });

    return getValidatedObjectFromSchema<{ name: string }>(schema, body);
};