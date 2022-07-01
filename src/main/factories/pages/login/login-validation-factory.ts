import { ValidationComposite } from "@/presentation/validation/validators";
import { ValidationBuilder } from "@/presentation/validation/builder/validation-builder";

export const makeLoginValidation = (): ValidationComposite => {
  return  ValidationComposite.build([
    ...ValidationBuilder.field("email").required().email().build(),
    ...ValidationBuilder.field("password").required().min(5).build()
  ])
}