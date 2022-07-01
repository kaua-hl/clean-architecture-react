import { ValidationBuilder } from "@/presentation/validation/builder/validation-builder";
import { ValidationComposite } from "@/presentation/validation/validators";
import { makeLoginValidation } from "./login-validation-factory";

describe('LoginValidationFactory', () => {
  it('Should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation();
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field("email").required().email().build(),
      ...ValidationBuilder.field("password").required().min(5).build()
    ]))
  });
});