import { ValidationError } from 'yup';

interface IErrors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): IErrors {
  const validationsErrors: IErrors = {};

  err.inner.forEach((error) => {
    validationsErrors[err.path] = error.message;
  });

  return validationsErrors;
}
