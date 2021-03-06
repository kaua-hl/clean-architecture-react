import { InvalidFieldError } from "../../errors";
import { FieldValidation } from "../../protocols/field-validation";

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}
  
  validate(value: string): Error {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
    return (!value || emailRegex.test(value)) ? null : new InvalidFieldError();
  }
}