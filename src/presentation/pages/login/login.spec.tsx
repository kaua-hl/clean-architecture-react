import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import faker from "faker";
import "jest-localstorage-mock";
import Login from "./login";
import { AuthenticationSpy, ValidationStub } from "@/presentation/test";
import { render, RenderResult, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { InvalidCredentialsError } from "@/domain/errors";

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ["/login"]});
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <Router location={history.location} navigator={history}>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </Router>
  );
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

const testStatusForField = (
    sut: RenderResult,
    fieldName: string,
    validationError?: string
  ): void => {
    const emailStatus = sut.getByTestId(`${fieldName}-status`);
    expect(emailStatus.title).toBe(validationError || "Tudo certo!");
    expect(emailStatus.textContent).toBe(validationError ? "🔴" : "🟢");
}

const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
  const errorWrap = sut.getByTestId("error-wrap");
  expect(errorWrap.childElementCount).toBe(count);
}

const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const el = sut.getByTestId(fieldName);
  expect(el).toBeTruthy();
}

const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
  const el = sut.getByTestId(fieldName);
  expect(el.textContent).toBe(text);
}

const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisabled);
}

describe('Login Component', () => {
  afterEach(cleanup);

  beforeEach(() => {
    localStorage.clear();
  })

  it('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    testErrorWrapChildCount(sut, 0);
    testButtonIsDisabled(sut, "submit", true)
    testStatusForField(sut, "email", validationError);
    testStatusForField(sut, "password", validationError);
  });

  it('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populateEmailField(sut);
    testStatusForField(sut, "email", validationError);
  });

  it('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populatePasswordField(sut);
    testStatusForField(sut, "password", validationError);
  });

  it('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    testStatusForField(sut, "email");
  });

  it('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut();
    populatePasswordField(sut);
    testStatusForField(sut, "password");
  });

  it('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    populatePasswordField(sut);
    testButtonIsDisabled(sut, "submit", false);
  });

  it('Should show spinner on submit', () => {
    const { sut } = makeSut();
    simuteValidSubmit(sut);
    testElementExists(sut, "spinner");
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

  it('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words();
    const { sut, authenticationSpy } = makeSut({ validationError });
    populateEmailField(sut);
    fireEvent.submit(sut.getByTestId("form"));
    expect(authenticationSpy.callsCount).toBe(0);
  });

  it('Should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(authenticationSpy, "auth").mockReturnValueOnce(Promise.reject(error))
    simuteValidSubmit(sut);
    await waitFor(() => {
      testElementText(sut, "main-error", error.message);
      testErrorWrapChildCount(sut, 1);
    });
  });

  it('Should add accessToken to localstorage on success', async () => {
    const { sut, authenticationSpy } = makeSut();
    simuteValidSubmit(sut);
    await waitFor(() => {
      sut.getByTestId("form")
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "accessToken", 
        authenticationSpy.account.accessToken
      );
    });
    expect(history.location.pathname).toBe("/")
  });

  it('Should go to a signup page', () => {
    const { sut } = makeSut();
    const register = sut.getByTestId("signup");
    fireEvent.click(register);
    expect(history.location.pathname).toBe("/signup")
  });
}); 