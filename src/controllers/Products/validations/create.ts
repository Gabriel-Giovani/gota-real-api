import { EErrors } from '../../../components/error';
import * as Yup from 'yup';
import { getValidatedObjectFromSchema } from '../../../helpers/validators';

export const productCreate = (
    name: string,
    category: number,
    photo: string
    ) => {
    const body = {
        name,
        category,
        photo
    };

    const schema = Yup.object().shape({
        name: Yup.string()
            .typeError(EErrors.INVALID_NAME)
            .required(EErrors.INVALID_NAME),
        category: Yup.number()
            .typeError(EErrors.INVALID_CATEGORY)
            .required(EErrors.INVALID_CATEGORY),
        photo: Yup.string()
            .typeError(EErrors.INVALID_PHOTO)
            .required(EErrors.INVALID_PHOTO)
    });

    return getValidatedObjectFromSchema<{
        name: string,
        category: number,
        photo: string
    }>(schema, body);
};