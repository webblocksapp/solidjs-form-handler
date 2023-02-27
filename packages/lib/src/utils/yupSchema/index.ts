import { ErrorMap, ValidationSchema } from '@interfaces';
import { flattenObject, set, get, ValidationError, formatObjectPath } from '@utils';
import { SchemaOf, reach, ValidationError as YupValidationError } from 'yup';
import * as yup from 'yup';
import { AnyObject, ValidateOptions } from 'yup/lib/types';

/**
 * Yup schema adapter for solid form handler.
 */
export const yupSchema = <T>(schema: SchemaOf<T>): ValidationSchema<T> => {
  /**
   * Checks if the field is part of the given yup schema.
   * Fields that are not part of the schema are considered as metadata
   * and doesn't require validation. e.g. id, timestamp, foreignId, etc...
   */
  const isFieldFromSchema = (path: string) => {
    let isFromSchema = true;
    try {
      reach(schema, path);
    } catch (_) {
      isFromSchema = false;
    }
    return isFromSchema;
  };

  /**
   * Validates a single field of the form.
   */
  const validateAt: ValidationSchema<T>['validateAt'] = async (path, data, options) => {
    try {
      await schema.validateAt(path, data, options);
    } catch (error) {
      if (error instanceof YupValidationError) {
        const children = buildErrorMap(error.inner);
        throw new ValidationError(path, error.message, children);
      } else {
        console.error(error);
      }
    }
  };

  const buildErrorMap = (errors: YupValidationError['inner'], errorMap: ErrorMap = []) => {
    errors?.forEach((error) => {
      errorMap.push({ path: formatObjectPath(error.path as string), message: error.errors[0] });
      if (error.inner.length) buildErrorMap(error.inner, errorMap);
    });

    return errorMap;
  };

  /**
   * Builds a default object from a yup schema
   */
  const buildDefault = (_schema: yup.AnySchema = schema, path?: string, object?: any): T => {
    let obj = object;
    path = path ? `${path}.` : '';
    const targetPath = path.replace(/\.$/, '');
    const schemaType = _schema.type;

    if (schemaType === 'array') {
      if (_schema.getDefault()) {
        set(obj, targetPath, _schema.getDefault());
      } else {
        obj = obj ? set(obj, targetPath, []) : [];
        /**
         * When the schema is an array without a default value, it reach the 0 index of the array for getting
         * the inner yup schema (it can be an object, array or a primitive schema).
         */
        const reachedSchema = reach(_schema, '0') as yup.AnySchema;
        obj = buildDefault(reachedSchema, `${path}0`, obj);
      }
    } else if (schemaType === 'object') {
      obj = obj ? set(obj, targetPath, {}) : {};
      /**
       * Iterates every schema key to check if it is an ArraySchema or ObjectSchema.
       * If no, the default empty value is assigned to the object.
       */
      Object.keys(flattenObject(_schema.getDefault())).forEach((key) => {
        const reachedSchema = reach(_schema, key);
        obj = buildDefault(reachedSchema, `${path}${key}`, obj);
      });
    } else {
      /**
       * It checks if the target path is an array or no.
       * For example if target path is:
       * key1.key2 -> obj is threated as an object
       * key1.key2.0 -> obj is threated as an array, so is taken
       * prevTargetPath key1.key2 for assigning an empty array.
       */
      const prevTargetPath = targetPath.split('.').slice(0, -1).join('.');
      obj = Array.isArray(get(obj, prevTargetPath))
        ? set(obj, prevTargetPath, _schema.getDefault() ?? [])
        : set(obj, targetPath, _schema.getDefault() ?? buildDefaultValue(_schema));
    }

    return obj;
  };

  const buildDefaultValue = (schema: yup.AnySchema) => {
    switch (schema._type) {
      case 'boolean':
        return false;
      default:
        return '';
    }
  };

  const getFieldDataType = (path: string) => {
    return reach(schema, path).type;
  };

  return { isFieldFromSchema, validateAt, buildDefault, getFieldDataType };
};
