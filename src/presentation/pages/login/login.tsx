import { useState, useEffect } from "react";
import styles from "./login-styles.scss";
import { Footer, Input, LoginHeader, FormStatus } from "@/presentation/components";
import Context from "@/presentation/contexts/form/form-contentext";
import { Validation } from "@/presentation/protocols/validation";
import { Authentication } from "@/domain/usecases";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  validation: Validation;
  authentication: Authentication;
}

const Login = ({ validation, authentication }: Props) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    isLoading: false,
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    mainError: "",
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate("email", state.email),
      passwordError: validation.validate("password", state.password)
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return
      }
      setState({ ...state, isLoading: true });
      const account = await authentication.auth({ 
        email: state.email, 
        password: state.password 
      });
      localStorage.setItem("accessToken", account.accessToken);
      navigate("/")
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={ { state, setState } }>
        <form data-testid="form" className={styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu E-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button disabled={!!state.emailError || !!state.passwordError} data-testid="submit" className={styles.submit} type="submit">Entrar</button>
          <Link data-testid="signup" to="/signup" className={styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  ) 
}

export default Login;