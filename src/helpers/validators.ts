import { EErrors } from '../components/error';

export function validateDataSchema(body: any, schema: any): boolean {
    try {
        let valid = schema.strict().validateSync(body);
        if (!(valid))
            return false
        return true;
    } catch (err) {
        let errorMessage = "Failed to do something exceptional";
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        throw new Error(errorMessage);
    }
}

export function getValidatedObjectFromSchema<T>(schema: any, body: any) {
    try {
        if (validateDataSchema(body, schema)) {
            if (Array.isArray(body)) {
                let objs: any[] = [];

                if (schema._subType && schema._subType.type === "object") {
                    for (let i = 0; i < body.length; i++) {
                        let currObj = body[i];
                        let validObj = getValidatedObjectFromSchema(schema._subType, currObj);
                        objs.push(validObj);
                    }
                } else
                    objs = body;
                return objs as any as T;
            }
            if (schema && schema.fields) {
                let fields = Object.keys(schema.fields);
                let obj: any = Object.assign({});
                fields.map((field) => {
                    if (typeof body[field] === 'object')
                        obj[field] = getValidatedObjectFromSchema(schema.fields[field], body[field]);
                    else
                        obj[field] = body[field];
                });
                return obj as T;
            }
        }

        return body as T;
    } catch (err) {
        let errorMessage = "Failed to do something exceptional";
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        throw new Error(errorMessage);
    }
}

export async function validateObjSchema(obj: any, schema: any) {
    try {
        let valid = await schema.strict().validate(obj);
        if (!(valid)) {
            throw new Error(EErrors.INVALID_OBJ_SCHEMA);
        }
        return true;
    } catch (err) {
        let errorMessage = "Failed to do something exceptional";
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        throw new Error(errorMessage);
    }
}