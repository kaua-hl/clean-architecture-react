import { useState, useEffect } from "react";
import styles from "./login-styles.scss";
import { Footer, Input, LoginHeader, FormStatus } from "@/presentation/components";
import Context from "@/presentation/contexts/form/form-contentext";
import { Validation } from "@/presentation/protocols/validation";

type Props = {
  validation: Validation;
}

const Login = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: "",
    password: "",
    emailError: "",
    passwordError: "Campo obrigatório",
    mainError: "",
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate("email", state.email)
    })
  }, [state.email])

  useEffect(() => {
    validation.validate("password", state.password)
  }, [state.password])

  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={ { state, setState } }>
        <form className={styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu E-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button disabled data-testid="submit" className={styles.submit} type="submit">Entrar</button>
          <span className={styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login;