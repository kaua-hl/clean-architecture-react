import { InvalidFieldError } from "../../errors";
import { MinLengthValidation } from "./min-length-validation";


describe('MinLengthValidation', () => {
  it('Should return error if value is invalid', () => {
    const sut = new MinLengthValidation("field", 5);
    const error = sut.validate("234");
    expect(error).toEqual(new InvalidFieldError());
  });
});