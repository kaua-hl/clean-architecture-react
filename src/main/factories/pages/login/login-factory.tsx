import { Login } from "@/presentation/pages"
import { makeRemoteAuthentication } from "../../usecases/authentication/remote-authentication-factory";
import { makeLocalSaveAccessToken } from "../../usecases/authentication/save-access-token/local-save-access-token-factory";
import { makeLoginValidation } from "./login-validation-factory";

export const makeLogin = () => {
  return (
    <Login 
      authentication={makeRemoteAuthentication()} 
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  );
}