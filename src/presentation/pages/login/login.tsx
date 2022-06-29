import { useState } from "react";
import styles from "./login-styles.scss";
import { Footer, Input, LoginHeader, FormStatus } from "@/presentation/components";
import Context from "@/presentation/contexts/form/form-contentext";

const Login = () => {
  const [state] = useState({
    isLoading: false,
  });

  const [errorState] = useState({
    email: "Campo obrigatório",
    password: "Campo obrigatório",
    main: "",
  });

  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={ {state, errorState} }>
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