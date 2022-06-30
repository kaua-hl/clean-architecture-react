import Login from "./login";
import { AuthenticationSpy, ValidationStub } from "@/presentation/test";
import { render, RenderResult, fireEvent, cleanup } from "@testing-library/react";
import faker from "faker";

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError;
  const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />);
  return {
    sut,
    authenticationSpy
  }
}

const simuteValidSubmit = (
    sut: RenderResult,
    email = faker.internet.email(), 
    password = faker.internet.password()
  ): void => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);

  const submitButton = sut.getByTestId("submit");
  fireEvent.click(submitButton);
}

const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email(), 
): void => {
  const emailInput = sut.getByTestId("email");
  fireEvent.input(emailInput, { target: { value: email } });
}

const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.email(), 
): void => {
  const passwordInput = sut.getByTestId("password");
  fireEvent.input(passwordInput, { target: { value: password } });
}

const simulateStatusForField = (
    sut: RenderResult,
    fieldName: string,
    validationError?: string
  ): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`);
  expect(emailStatus.title).toBe(validationError || "Tudo certo!");
  expect(emailStatus.textContent).toBe(validationError ? "🔴" : "🟢"
  );
}

describe('Login Component', () => {
  afterEach(cleanup)

  it('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    simulateStatusForField(sut, "email", validationError);
    simulateStatusForField(sut, "password", validationError);
  });

  it('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populateEmailField(sut);
    simulateStatusForField(sut, "email", validationError);
  });

  it('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populatePasswordField(sut);
    simulateStatusForField(sut, "password", validationError);
  });

  it('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    simulateStatusForField(sut, "email");
  });

  it('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut();
    populatePasswordField(sut);
    simulateStatusForField(sut, "password");
  });

  it('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  it('Should show spinner on submit', () => {
    const { sut } = makeSut();
    simuteValidSubmit(sut);
    const spinner = sut.getByTestId("spinner");
    expect(spinner).toBeTruthy();
  });

  it('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simuteValidSubmit(sut, email, password);

    expect(authenticationSpy.params).toEqual({
      email,
      password
    });
  });

  it('Should call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut();
    simuteValidSubmit(sut);
    simuteValidSubmit(sut);
    
    expect(authenticationSpy.callsCount).toBe(1);
  });
});