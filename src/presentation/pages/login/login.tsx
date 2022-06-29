import styles from "./login-styles.scss";
import LoginHeader from "@/presentation/components/login-header/login-header";
import Footer from "@/presentation/components/footer/footer";
import Input from "@/presentation/components/input/input";
import FormStatus from "@/presentation/components/form-status/form-status";

const Login = () => {
  return (
    <div className={styles.login}>
      <LoginHeader />
      <form className={styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu E-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button className={styles.submit} type="submit">Entrar</button>
        <span className={styles.link}>Criar conta</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default Login;