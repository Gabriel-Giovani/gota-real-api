import { EErrors } from '../../../components/error';
import * as Yup from 'yup';
import { getValidatedObjectFromSchema } from '../../../helpers/validators';

export const bannerCreate = (
    title: string,
    link: string,
    photo: string
    ) => {
    const body = {
        title,
        link,
        photo
    };

    const schema = Yup.object().shape({
        title: Yup.string()
            .typeError(EErrors.INVALID_NAME)
            .required(EErrors.INVALID_NAME),
        link: Yup.string()
            .typeError(EErrors.INVALID_LINK)
            .required(EErrors.INVALID_LINK),
        photo: Yup.string()
            .typeError(EErrors.INVALID_PHOTO)
            .required(EErrors.INVALID_PHOTO)
    });

    return getValidatedObjectFromSchema<{
        title: string,
        link: string,
        photo: string
    }>(schema, body);
};