"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateObjSchema = exports.getValidatedObjectFromSchema = exports.validateDataSchema = void 0;
const error_1 = require("../components/error");
function validateDataSchema(body, schema) {
    try {
        let valid = schema.strict().validateSync(body);
        if (!(valid))
            return false;
        return true;
    }
    catch (err) {
        let errorMessage = "Failed to do something exceptional";
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        throw new Error(errorMessage);
    }
}
exports.validateDataSchema = validateDataSchema;
function getValidatedObjectFromSchema(schema, body) {
    try {
        if (validateDataSchema(body, schema)) {
            if (Array.isArray(body)) {
                let objs = [];
                if (schema._subType && schema._subType.type === "object") {
                    for (let i = 0; i < body.length; i++) {
                        let currObj = body[i];
                        let validObj = getValidatedObjectFromSchema(schema._subType, currObj);
                        objs.push(validObj);
                    }
                }
                else
                    objs = body;
                return objs;
            }
            if (schema && schema.fields) {
                let fields = Object.keys(schema.fields);
                let obj = Object.assign({});
                fields.map((field) => {
                    if (typeof body[field] === 'object')
                        obj[field] = getValidatedObjectFromSchema(schema.fields[field], body[field]);
                    else
                        obj[field] = body[field];
                });
                return obj;
            }
        }
        return body;
    }
    catch (err) {
        let errorMessage = "Failed to do something exceptional";
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        throw new Error(errorMessage);
    }
}
exports.getValidatedObjectFromSchema = getValidatedObjectFromSchema;
async function validateObjSchema(obj, schema) {
    try {
        let valid = await schema.strict().validate(obj);
        if (!(valid)) {
            throw new Error(error_1.EErrors.INVALID_OBJ_SCHEMA);
        }
        return true;
    }
    catch (err) {
        let errorMessage = "Failed to do something exceptional";
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        throw new Error(errorMessage);
    }
}
exports.validateObjSchema = validateObjSchema;
//# sourceMappingURL=validators.js.map