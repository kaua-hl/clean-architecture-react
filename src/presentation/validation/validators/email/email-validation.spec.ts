import { InvalidFieldError } from "../../errors";
import { EmailValidation } from "./email-validation";
import faker from "faker";

const makeSut = (): EmailValidation => {
  return new EmailValidation(faker.database.column());
}

describe('EmailValidation', () => {
  it('Should return error if email is invalid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError());
  });

  it('Should return falsy if email is valid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.internet.email());
    expect(error).toBeFalsy();
  });

  it('Should return falsy if email is empty', () => {
    const sut = makeSut();
    const error = sut.validate("");
    expect(error).toBeFalsy();
  });
});